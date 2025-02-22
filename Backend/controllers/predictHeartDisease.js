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
import HeartDiseaseReport from '../models/HeartDisease_report.js'
import User from '../models/UserModel.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// exports.predictHeartDisease = (req, res) => {
export const predictHeartDisease = async (req, res) => {
  try{
  const inputFeatures = req.body.features;
  // console.log('inputFeatures:', inputFeatures);

  const id = req.user.id;
    // console.log('User ID:', id);

    // Fetch User & Diabetes Report
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({ error: 'User not found' });
    }
    // console.log('User Details:', userDetails);

    const heartDiseaseReport = await HeartDiseaseReport.findById(userDetails.heartDiseaseReportId);
    if (!heartDiseaseReport) {
      return res.status(404).json({ error: 'Heart Disease report not found' });
    }

    // Update diabetes report with input values
    [
      heartDiseaseReport.age,
      heartDiseaseReport.sex,
      heartDiseaseReport.chestPainTypes,
      heartDiseaseReport.restingBloodPressure,
      heartDiseaseReport.serumCholestoral,
      heartDiseaseReport.fastingBloodSugar,
      heartDiseaseReport.restingECGResults,
      heartDiseaseReport.maxHeartRate,
      heartDiseaseReport.exerciseInducedAngina,
      heartDiseaseReport.stDepressionExercise,
      heartDiseaseReport.slopeOfPeakExerciseSTSegment,
      heartDiseaseReport.majorVesselsColoredByFluoroscopy,
      heartDiseaseReport.thalStatus,
    ] = inputFeatures;

    heartDiseaseReport.lastChecked = Date.now();





  // Check if Python script exists
  const scriptPath = path.join(__dirname, '../ml_scripts/heart_disease_prediction.py');
  if (!fs.existsSync(scriptPath)) {
    console.error('Python script not found at:', scriptPath);
    return res.status(500).json({ error: 'Python script not found' });
  }

  // const options = {
  //   mode: 'text',
  //   pythonPath: path.resolve('ml_env/Scripts/python.exe'),
  //   pythonOptions: ['-u'], // Force stdout to be unbuffered
  //   scriptPath: path.join(__dirname, '../ml_scripts'),
  //   args: [JSON.stringify(inputFeatures)],
  // };


  const pythonPath = process.platform === 'win32' 
  ? path.resolve('ml_env/Scripts/python.exe') 
  : path.resolve('ml_env/bin/python');

  const options = {
    mode: 'text',
    pythonPath: pythonPath,
    pythonOptions: ['-u'], // Force stdout to be unbuffered
    scriptPath: path.join(__dirname, '../ml_scripts'),
    args: [JSON.stringify(inputFeatures)],
  };






  // console.log('Starting Python script execution...');
  
  const pyshell = new PythonShell('heart_disease_prediction.py', options);
  
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
    
    // console.log('Python script completed with code:', code);
    try {
      if (!scriptOutput) {
        throw new Error('No output from Python script');
      }
      const prediction = JSON.parse(scriptOutput.trim());
      if (prediction.error) {
        throw new Error(prediction.error);
      }
      // console.log('Parsed prediction:', prediction);

      heartDiseaseReport.outcome = prediction.prediction;
      await heartDiseaseReport.save();  // ✅ Save the report AFTER getting the prediction

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
      heartDiseaseReport.outcome = -1;
      await heartDiseaseReport.save();  // ✅ Save even if there's an error (outcome = -1)


      res.status(500).json({ 
        error: 'Failed to parse prediction result', 
        details: parseError.message,
        debug_output: scriptError 
      });
    }
  });
  }catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
  
};

