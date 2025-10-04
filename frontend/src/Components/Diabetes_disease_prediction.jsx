import React, { useState } from 'react';
import axios from 'axios';

const DiabetesPrediction = () => {
  const [features, setFeatures] = useState({
    pregnancies: 0,
    glucose: 0,
    bloodPressure: 0,
    skinThickness: 0,
    insulin: 0,
    bmi: 0,
    diabetesPedigreeFunction: 0,
    age: 0
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const URL = BASE_URL + '/predict/diabetes';
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: parseFloat(e.target.value)
    });
  };

  const predictDiabetes = async (e) => {
    e.preventDefault();

    




    try {
        // console.log("calling api call for Diabetes disease prediction"); 
      
      // const response = await axios.post( BASE_URL + '/predict/diabetes', { 
      // const response = await axios.post('https://predictcareai.onrender.com/api/predict/diabetes', { 
      const response = await axios.post(URL, { 
        features: Object.values(features) 
      });
      
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      console.error('Prediction error', error);
      setError('Failed to predict diabetes');
      setPrediction(null);
    }
  };

  return (
    <div className="diabetes-prediction">
      <h2>Diabetes Prediction</h2>
      <form onSubmit={predictDiabetes}>
        <div className="form-grid">
          <input
            type="number"
            name="pregnancies"
            placeholder="Number of Pregnancies"
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="glucose"
            placeholder="Glucose Level"
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="bloodPressure"
            placeholder="Blood Pressure (mm Hg)"
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="skinThickness"
            placeholder="Skin Thickness (mm)"
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="insulin"
            placeholder="Insulin Level (mu U/ml)"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="bmi"
            placeholder="Body Mass Index (BMI)"
            onChange={handleInputChange}
            required
            step="0.001"
          />
          <input
            type="number"
            name="diabetesPedigreeFunction"
            placeholder="Diabetes Pedigree Function"
            onChange={handleInputChange}
            step="0.001"
          />
          <input
            type="number"
            name="age"
            placeholder="Age (years)"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Predict Diabetes</button>
      </form>

      {prediction !== null && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>{prediction === 1 ? 'Diabetes Positive' : 'Diabetes Negative'}</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default DiabetesPrediction;
