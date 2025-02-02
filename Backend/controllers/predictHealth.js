// import PythonShell from "python-shell";
// import path from "path";
// import fs from "fs";

// export const predictHealth = (req, res) => {
//   const inputFeatures = req.body.features;
//   console.log("Received health features:", inputFeatures);

//   // Verify the Python script exists
//   const scriptFile = path.join(__dirname, "../ml_scripts/health_prediction.py");
//   if (!fs.existsSync(scriptFile)) {
//     console.error("Python script not found at:", scriptFile);
//     return res.status(500).json({ error: "Python script not found" });
//   }

//   // Configure PythonShell options
//   const options = {
//     mode: "text",
//     pythonPath: path.resolve("ml_env/Scripts/python.exe"),
//     pythonOptions: ["-u"],
//     scriptPath: path.join(__dirname, "../ml_scripts"),
//     args: [JSON.stringify(inputFeatures)]
//   };

//   console.log("Executing Python script with options:", options);
//   const pyshell = new PythonShell("health_prediction.py", options);

//   let scriptOutput = "";
//   let scriptError = "";

//   // Collect output from stdout
//   pyshell.stdout.on("data", (data) => {
//     console.log("Python stdout:", data);
//     scriptOutput += data;
//   });

//   // Collect error output from stderr
//   pyshell.stderr.on("data", (data) => {
//     console.error("Python stderr:", data);
//     scriptError += data;
//   });

//   pyshell.end((err, code, signal) => {
//     if (err) {
//       console.error("Python Shell Error:", err);
//       return res.status(500).json({
//         error: "Failed to execute Python script",
//         details: err.message
//       });
//     }
//     console.log("Python script completed with code:", code);
//     try {
//       if (!scriptOutput) {
//         throw new Error("No output from Python script");
//       }
//       const prediction = JSON.parse(scriptOutput.trim());
//       console.log("Parsed prediction:", prediction);
//       res.json({
//         prediction: prediction.prediction,
//         success: true
//       });
//     } catch (parseError) {
//       console.error("Parsing Error:", parseError);
//       res.status(500).json({
//         error: "Failed to parse prediction result",
//         details: parseError.message,
//         debug_output: scriptError
//       });
//     }
//   });
// };






















import PythonShell from 'python-shell';
import path from 'path';
import fs from 'fs';

export const predictHealthCondition = (req, res) => {
  const inputFeatures = req.body.features;
  console.log('inputFeatures:', inputFeatures);

  // Check if Python script exists
  const scriptPath = path.join(__dirname, '../ml_scripts/health_prediction.py');
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

  const pyshell = new PythonShell('health_prediction.py', options);

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
