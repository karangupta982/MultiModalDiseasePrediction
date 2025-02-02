// const { PythonShell } = require('python-shell');
// const path = require('path');

// exports.predictDiabetes = (req, res) => {
//   const inputFeatures = req.body.features;

//   const options = {
//     mode: 'text',
//     pythonPath: path.resolve('.venv/Scripts/python.exe'), // Explicit path to virtual env Python
//     pythonOptions: ['-u'],
//     scriptPath: path.join(__dirname, '../ml_scripts'),
//     args: [JSON.stringify(inputFeatures)]
//   };

//   PythonShell.run('diabetes_prediction.py', options, (err, results) => {
//     if (err) {
//       console.error('Python Shell Error:', err);
//       return res.status(500).json({ error: err.message });
//     }
    
//     try {
//       const prediction = JSON.parse(results[0]);
//       res.json({ 
//         prediction: prediction,
//         success: true 
//       });
//     } catch (parseError) {
//       console.error('Parsing Error:', parseError);
//       res.status(500).json({ error: 'Failed to parse prediction result' });
//     }
//   });
// };

























// const { PythonShell } = require('python-shell');
// const path = require('path');

// exports.predictDiabetes = (req, res) => {
//   const inputFeatures = req.body.features;
//   console.log('inputFeatures:', inputFeatures);

//   // const options = {
//   //   mode: 'text',
//   //   pythonPath: path.resolve('ml_env/Scripts/python.exe'), // Adjust to your Python environment
//   //   // pythonPath: path.resolve('.venv/Scripts/python.exe'), // Adjust to your Python environment
//   //   pythonOptions: ['-u'],
//   //   scriptPath: path.join(__dirname, '../ml_scripts'),
//   //   args: [JSON.stringify(inputFeatures)] // Send input as JSON string
//   //   // args: [inputFeatures] // Send input as array
//   // };

//   const options = {
//     mode: 'text',
//     pythonPath: path.resolve('ml_env/Scripts/python.exe'), // Adjust to your Python environment
//     pythonOptions: ['-u'],
//     scriptPath: path.join(__dirname, '../ml_scripts'),
//     args: [JSON.stringify(inputFeatures)], // Send input as JSON string
//   };
  

//   console.log('Executing Python script...',options);
//   PythonShell.run('diabetes_prediction.py', options, (err, results) => {
//     if (err) {
//       console.log('Python Shell Error:', err);
//       return res.status(500).json({ error: err.message });
//     }


//     console.log('Python script executed. Results:', results);
//     try {
//       console.log('results in prediction controller:', results);
//       const prediction = JSON.parse(results[0]); // Parse the prediction result
//       res.json({ 
//         prediction: prediction,
//         success: true 
//       });
//     } catch (parseError) {
//       console.log('Parsing Error:', parseError);
//       res.status(500).json({ error: 'Failed to parse prediction result' });
//     }
//   });
// };





// const { PythonShell } = require('python-shell');
// const path = require('path');
// exports.predictDiabetes = (req, res) => {
//   const inputFeatures = req.body.features;

//   // Validate input features
//   if (!Array.isArray(inputFeatures) || inputFeatures.length === 0) {
//     return res.status(400).json({ error: 'Invalid input features' });
//   }

//   console.log('inputFeatures:', inputFeatures);

//   const options = {
//     mode: 'text',
//     pythonPath: path.resolve('ml_env/Scripts/python.exe'), // Path to your Python environment
//     pythonOptions: ['-u'],
//     scriptPath: path.join(__dirname, '../ml_scripts'), // Correctly resolve the script path
//     args: [JSON.stringify(inputFeatures)], // Send input as JSON string
//   };
  
  
//   console.log('Executing Python script...', options);
//   PythonShell.run('/diabetes_prediction.py', options, (err, results) => {
//     if (err) {
//       console.error('Python Shell Error:', err);
//       return res.status(500).json({ error: 'Failed to execute Python script', details: err.message });
//     }

//     console.log('Python script executed. Results:', results);
//     try {
//       if (!results || results.length === 0) {
//         console.log('No results returned from Python script')
//         throw new Error('No results returned from Python script');
//       }
//       const prediction = JSON.parse(results[0]); // Parse the prediction result
//       res.json({ 
//         prediction: prediction,
//         success: true 
//       });
//     } catch (parseError) {
//       console.error('Parsing Error:', parseError);
//       res.status(500).json({ error: 'Failed to parse prediction result', details: parseError.message });
//     }
//   });
// };









// predictionController.js
// const { PythonShell } = require('python-shell');
// const path = require('path');
// const fs = require('fs');

// exports.predictDiabetes = (req, res) => {
//   const inputFeatures = req.body.features;
//   console.log('inputFeatures:', inputFeatures);

//   // Check if Python script exists
//   const scriptPath = path.join(__dirname, '../ml_scripts/diabetes_prediction.py');
//   if (!fs.existsSync(scriptPath)) {
//     console.error('Python script not found at:', scriptPath);
//     return res.status(500).json({ error: 'Python script not found' });
//   }

//   const options = {
//     mode: 'text',
//     pythonPath: path.resolve('ml_env/Scripts/python.exe'),
//     pythonOptions: ['-u'], // Force stdout to be unbuffered
//     scriptPath: path.join(__dirname, '../ml_scripts'),
//     args: [JSON.stringify(inputFeatures)],
//   };

//   console.log('Starting Python script execution...');
  
//   // Add timeout to PythonShell
//   const pyshell = new PythonShell('diabetes_prediction.py', options);
  
//   let scriptOutput = '';
  
//   pyshell.stdout.on('data', (data) => {
//     console.log('Python stdout:', data);
//     scriptOutput += data;
//   });

//   pyshell.stderr.on('data', (data) => {
//     console.error('Python stderr:', data);
//   });

//   pyshell.end((err, code, signal) => {
//     if (err) {
//       console.error('Python Shell Error:', err);
//       return res.status(500).json({ 
//         error: 'Failed to execute Python script', 
//         details: err.message 
//       });
//     }
    
//     console.log('Python script completed with code:', code);
//     try {
//       if (!scriptOutput) {
//         throw new Error('No output from Python script');
//       }
//       const prediction = JSON.parse(scriptOutput);
//       res.json({ 
//         prediction: prediction,
//         success: true 
//       });
//     } catch (parseError) {
//       console.error('Parsing Error:', parseError);
//       res.status(500).json({ 
//         error: 'Failed to parse prediction result', 
//         details: parseError.message,
//         output: scriptOutput 
//       });
//     }
//   });
// };












// const { PythonShell } = require('python-shell');
// const path = require('path');
// const fs = require('fs');

import {PythonShell} from 'python-shell'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// exports.predictDiabetes = (req, res) => {
export const predictDiabetes = (req, res) => {
  const inputFeatures = req.body.features;
  console.log('inputFeatures:', inputFeatures);

  // Check if Python script exists
  const scriptPath = path.join(__dirname, '../ml_scripts/diabetes_prediction.py');
  if (!fs.existsSync(scriptPath)) {
    console.error('Python script not found at:', scriptPath);
    return res.status(500).json({ error: 'Python script not found' });
  }

  const options = {
    mode: 'text',
    pythonPath: path.resolve('ml_env/Scripts/python.exe'),
    pythonOptions: ['-u'], // Force stdout to be unbuffered
    scriptPath: path.join(__dirname, '../ml_scripts'),
    args: [JSON.stringify(inputFeatures)],
  };

  console.log('Starting Python script execution...');
  
  const pyshell = new PythonShell('diabetes_prediction.py', options);
  
  let scriptOutput = '';
  let scriptError = '';
  
  // Collect stdout (only JSON results)
  pyshell.stdout.on('data', (data) => {
    console.log('Python stdout:', data);
    scriptOutput += data;
  });

  // Collect stderr (debug logs)
  pyshell.stderr.on('data', (data) => {
    scriptError += data;
    console.error('Python stderr:', data);
  });

  pyshell.end((err, code, signal) => {
    if (err) {
      console.error('Python Shell Error:', err);
      return res.status(500).json({ 
        error: 'Failed to execute Python script', 
        details: err.message 
      });
    }
    
    console.log('Python script completed with code:', code);
    try {
      if (!scriptOutput) {
        throw new Error('No output from Python script');
      }
      const prediction = JSON.parse(scriptOutput.trim());
      if (prediction.error) {
        throw new Error(prediction.error);
      }
      console.log('Parsed prediction:', prediction);
      res.json({ 
        prediction: prediction.prediction,
        success: true 
      });
    } catch (parseError) {
      console.error('Parsing Error:', parseError);
      res.status(500).json({ 
        error: 'Failed to parse prediction result', 
        details: parseError.message,
        debug_output: scriptError 
      });
    }
  });
};