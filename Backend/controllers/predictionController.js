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
    // console.log('Received inputFeatures:', inputFeatures);

    const id = req.user.id;
    // console.log('User ID:', id);

    // Fetch User & Diabetes Report
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({ error: 'User not found' });
    }
    // console.log('User Details:', userDetails);

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

    // const options = {
    //   mode: 'text',
    //   pythonPath: path.resolve('ml_env/Scripts/python.exe'),
    //   pythonOptions: ['-u'],
    //   scriptPath: path.join(__dirname, '../ml_scripts'),
    //   args: [JSON.stringify(inputFeatures)],
    // };


  //   const pythonPath = process.platform === 'win32' 
  // ? path.resolve('ml_env/Scripts/python.exe') 
  // : path.resolve('ml_env/bin/python');

  const pythonPath = process.env.PYTHON_PATH || 'python3';

  const options = {
    mode: 'text',
    pythonPath: pythonPath || 'python3',
    // pythonPath: 'python3',
    pythonOptions: ['-u'], // Force stdout to be unbuffered
    scriptPath: path.join(__dirname, '../ml_scripts'),
    args: [JSON.stringify(inputFeatures)],
  };





    // console.log('Starting Python script execution...');

    const pyshell = new PythonShell('diabetes_prediction.py', options);
    
    let scriptOutput = '';
    let scriptError = '';

    pyshell.stdout.on('data', (data) => {
      // console.log('Python stdout:', data);
      scriptOutput += data;
    });

    pyshell.stderr.on('data', (data) => {
      scriptError += data;
      // console.error('Python stderr:', data);
    });

    pyshell.end(async (err, code, signal) => {
      if (err) {
        // console.error('Python Shell Error:', err);
        return res.status(500).json({
          error: 'Failed to execute Python script',
          details: err.message
        });
      }

      // console.log('Python script finished with code:', code);

      try {
        if (!scriptOutput) {
          throw new Error('No output from Python script');
        }

        const prediction = JSON.parse(scriptOutput.trim());
        if (prediction.error) {
          throw new Error(prediction.error);
        }

        // console.log('Parsed Prediction:', prediction);

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
        // console.error('Parsing Error:', parseError);
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
