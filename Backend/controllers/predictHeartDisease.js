const { PythonShell } = require('python-shell');
const path = require('path');

exports.predictHeartDisease = (req, res) => {
  const { features } = req.body;
  
  const options = {
    mode: 'text',
    pythonPath: 'python',
    scriptPath: path.join(__dirname, '../ml_scripts'),
    args: [JSON.stringify(features)]
  };

  PythonShell.run('heart_disease_prediction.py', options, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    
    const prediction = JSON.parse(results[0]);
    res.json({ 
      prediction: prediction,
      success: true 
    });
  });
};