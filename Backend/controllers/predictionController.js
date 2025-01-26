const { PythonShell } = require('python-shell');
const path = require('path');

exports.predictDiabetes = (req, res) => {
  const inputFeatures = req.body.features;

  const options = {
    mode: 'text',
    pythonPath: 'python', // Ensure Python is in your system PATH
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: path.join(__dirname, '../ml_scripts'),
    args: [JSON.stringify(inputFeatures)]
  };

  PythonShell.run('diabetes_prediction.py', options, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    
    // Parse the prediction result
    const prediction = JSON.parse(results[0]);
    res.json({ 
      prediction: prediction,
      success: true 
    });
  });
};