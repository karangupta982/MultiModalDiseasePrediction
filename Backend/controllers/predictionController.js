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





// import {PythonShell} from 'python-shell'
// import path from 'path'
// import fs from 'fs'
// import { fileURLToPath } from 'url';
// import DiabetesReportSchema from '../models/diabetes_report.js'
// import User from '../models/UserModel.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // exports.predictDiabetes = (req, res) => {
// export const predictDiabetes = async(req, res) => {
//   const inputFeatures = req.body.features;
//   console.log('inputFeatures:', inputFeatures);
//   const id = req.user.id;
//   console.log('userId inside diabetescontroller',id)
//   const userDetails = await User.findById(id);
//   console.log('userDetails inside diabetescontroller',userDetails)
//   const diabetesReport = await DiabetesReportSchema.findById(userDetails.diabetesReportId);

//   diabetesReport.pregnancies = inputFeatures[0];
//   diabetesReport.glucose = inputFeatures[1];
//   diabetesReport.bloodPressure = inputFeatures[2];
//   diabetesReport.skinThickness = inputFeatures[3];
//   diabetesReport.insulin = inputFeatures[4];
//   diabetesReport.bmi = inputFeatures[5];
//   diabetesReport.diabetesPedigreeFunction = inputFeatures[6];
//   diabetesReport.age = inputFeatures[7];
//   diabetesReport.lastChecked = Date.now();
  

//   const updatedUserDetails = await User.findById(id).populate("diabetesReportId").exec()

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
  
//   const pyshell = new PythonShell('diabetes_prediction.py', options);
  
//   let scriptOutput = '';
//   let scriptError = '';
  
//   // Collect stdout (only JSON results)
//   pyshell.stdout.on('data', (data) => {
//     console.log('Python stdout:', data);
//     scriptOutput += data;
//   });

//   // Collect stderr (debug logs)
//   pyshell.stderr.on('data', (data) => {
//     scriptError += data;
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
//       const prediction = JSON.parse(scriptOutput.trim());
//       if (prediction.error) {
//         throw new Error(prediction.error);
//       }
//       console.log('Parsed prediction:', prediction);

//       diabetesReport.outcome = prediction.prediction ;
      

//       res.json({ 
//         prediction: prediction.prediction,
//         success: true,
//         updatedUserDetails
//       });
//     } catch (parseError) {
//       console.error('Parsing Error:', parseError);
//       diabetesReport.outcome = -1;
//       res.status(500).json({ 
//         error: 'Failed to parse prediction result', 
//         details: parseError.message,
//         debug_output: scriptError 
//       });
//     }
    
//   });
//   await diabetesReport.save();
//   console.log("diabetes controller full user details",updatedUserDetails)
// };




















import { PythonShell } from 'python-shell';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import DiabetesReportSchema from '../models/diabetes_report.js';
import User from '../models/UserModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const predictDiabetes = async (req, res) => {
  try {
    const inputFeatures = req.body.features;
    console.log('Received inputFeatures:', inputFeatures);

    const id = req.user.id;
    console.log('User ID:', id);

    // Fetch User & Diabetes Report
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User Details:', userDetails);

    const diabetesReport = await DiabetesReportSchema.findById(userDetails.diabetesReportId);
    if (!diabetesReport) {
      return res.status(404).json({ error: 'Diabetes report not found' });
    }
    // Update diabetes report with input values
    [
      diabetesReport.pregnancies,
      diabetesReport.glucose,
      diabetesReport.bloodPressure,
      diabetesReport.skinThickness,
      diabetesReport.insulin,
      diabetesReport.bmi,
      diabetesReport.diabetesPedigreeFunction,
      diabetesReport.age
    ] = inputFeatures;

    diabetesReport.lastChecked = Date.now();

    // Validate Python script existence
    const scriptPath = path.join(__dirname, '../ml_scripts/diabetes_prediction.py');
    if (!fs.existsSync(scriptPath)) {
      console.error('Python script not found:', scriptPath);
      return res.status(500).json({ error: 'Python script not found' });
    }

    const options = {
      mode: 'text',
      pythonPath: path.resolve('ml_env/Scripts/python.exe'),
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, '../ml_scripts'),
      args: [JSON.stringify(inputFeatures)],
    };

    console.log('Starting Python script execution...');

    const pyshell = new PythonShell('diabetes_prediction.py', options);
    
    let scriptOutput = '';
    let scriptError = '';

    pyshell.stdout.on('data', (data) => {
      console.log('Python stdout:', data);
      scriptOutput += data;
    });

    pyshell.stderr.on('data', (data) => {
      scriptError += data;
      console.error('Python stderr:', data);
    });

    pyshell.end(async (err, code, signal) => {
      if (err) {
        console.error('Python Shell Error:', err);
        return res.status(500).json({
          error: 'Failed to execute Python script',
          details: err.message
        });
      }

      console.log('Python script finished with code:', code);

      try {
        if (!scriptOutput) {
          throw new Error('No output from Python script');
        }

        const prediction = JSON.parse(scriptOutput.trim());
        if (prediction.error) {
          throw new Error(prediction.error);
        }

        console.log('Parsed Prediction:', prediction);

        diabetesReport.outcome = prediction.prediction;
        await diabetesReport.save();  // ✅ Save the report AFTER getting the prediction

        // ✅ Fetch updated user details after saving
        const updatedUserDetails = await User.findById(id)
          .populate("diabetesReportId")
          .populate("heartDiseaseReportId")
          .populate("parkinsonDiseaseReportId")
          .exec();

        res.json({
          prediction: prediction.prediction,
          success: true,
          updatedUserDetails
        });

      } catch (parseError) {
        console.error('Parsing Error:', parseError);
        diabetesReport.outcome = -1;
        await diabetesReport.save();  // ✅ Save even if there's an error (outcome = -1)

        res.status(500).json({
          error: 'Failed to parse prediction result',
          details: parseError.message,
          debug_output: scriptError
        });
      }
    });

  } catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
