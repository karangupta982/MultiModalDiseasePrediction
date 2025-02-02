// const { PythonShell } = require('python-shell');
// const path = require('path');

// exports.predictHeartDisease = (req, res) => {
//   const { features } = req.body;
  
//   const options = {
//     mode: 'text',
//     pythonPath: 'python',
//     scriptPath: path.join(__dirname, '../ml_scripts'),
//     args: [JSON.stringify(features)]
//   };

//   PythonShell.run('heart_disease_prediction.py', options, (err, results) => {
//     if (err) return res.status(500).json({ error: err });
    
//     const prediction = JSON.parse(results[0]);
//     res.json({ 
//       prediction: prediction,
//       success: true 
//     });
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


// exports.predictHeartDisease = (req, res) => {
export const predictHeartDisease = (req, res) => {
  const inputFeatures = req.body.features;
  console.log('inputFeatures:', inputFeatures);

  // Check if Python script exists
  const scriptPath = path.join(__dirname, '../ml_scripts/heart_disease_prediction.py');
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
  
  const pyshell = new PythonShell('heart_disease_prediction.py', options);
  
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

