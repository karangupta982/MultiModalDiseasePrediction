import {PythonShell} from 'python-shell';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const chatController = (req, res) => {
  const userMessage = req.body.message;
  console.log('User message:', userMessage);
  console.log("inside groq controller....")
  // Check if Python script exists
  const scriptPath = path.join(__dirname, '../ml_scripts/groq_chat.py');
  if (!fs.existsSync(scriptPath)) {
    console.error('Python script not found at:', scriptPath);
    return res.status(500).json({ error: 'Python script not found' });
  }
  // console.log('Script path:', scriptPath);

  // const options = {
  //   mode: 'text',
  //   pythonPath: path.resolve('ml_env/Scripts/python.exe'),
  //   pythonOptions: ['-u'], // Force stdout to be unbuffered
  //   scriptPath: path.join(__dirname, '../ml_scripts'),
  //   args: [JSON.stringify(userMessage)],
  // };


  // const pythonPath = process.platform === 'win32' 
  // ? path.resolve('ml_env/Scripts/python.exe') 
  // : path.resolve('ml_env/bin/python');


  const pythonPath = process.env.PYTHON_PATH || 'python3';

  const options = {
    mode: 'text',
    pythonPath: pythonPath,
    // pythonPath: 'python3',
    pythonOptions: ['-u'], // Force stdout to be unbuffered
    scriptPath: path.join(__dirname, '../ml_scripts'),
    args: [JSON.stringify(userMessage)],
  };

  // console.log('Starting Python script execution...');
  
  const pyshell = new PythonShell('groq_chat.py', options);
  
  let scriptOutput = '';
  let scriptError = '';
  
  // Collect stdout (only JSON results)
  pyshell.stdout.on('data', (data) => {
    // console.log('Python stdout:', data);
    scriptOutput += data;
  });

  // Collect stderr (debug logs)
  pyshell.stderr.on('data', (data) => {
    scriptError += data;
    // console.error('Python stderr:', data);
  });

  pyshell.end((err, code, signal) => {
    if (err) {
      // console.error('Python Shell Error:', err);
      return res.status(500).json({ 
        error: 'Failed to execute Python script', 
        details: err.message 
      });
    }
    
    // console.log('Python script completed with code:', code);
    try {
      if (!scriptOutput) {
        throw new Error('No output from Python script');
      }
      const response = JSON.parse(scriptOutput.trim());
      if (response.error) {
        throw new Error(response.error);
      }
      // console.log('Parsed response:', response);
      res.json({ 
        response: response.message,
        success: true 
      });
    } catch (parseError) {
      // console.error('Parsing Error:', parseError);
      res.status(500).json({ 
        error: 'Failed to parse chat response', 
        details: parseError.message,
        debug_output: scriptError 
      });
    }
  });
};
