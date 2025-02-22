import React, { useState } from 'react';
import axios from 'axios';

const ParkinsonsPrediction = () => {
  const parkinsonsFields = [
    'MDVP:Fo(Hz)',
    'MDVP:Fhi(Hz)',
    'MDVP:Flo(Hz)',
    'MDVP:Jitter(%)',
    'MDVP:Jitter(Abs)',
    'MDVP:RAP',
    'MDVP:PPQ',
    'Jitter:DDP',
    'MDVP:Shimmer',
    'MDVP:Shimmer(dB)',
    'Shimmer:APQ3',
    'Shimmer:APQ5',
    'MDVP:APQ',
    'Shimmer:DDA',
    'NHR',
    'HNR',
    'RPDE',
    'DFA',
    'Spread1',
    'Spread2',
    'D2',
    'PPE'
  ];

  const [features, setFeatures] = useState(
    parkinsonsFields.reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, {})
  );

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeatures({
      ...features,
      [name]: value
    });
  };

  const predictParkinsons = async (e) => {
    e.preventDefault();
    try {
        // console.log("calling api call for Parkinsons disease prediction"); 
      // const response = await axios.post('http://localhost:5000/api/predict/parkinsons', { 
      const response = await axios.post('https://predictcareai.onrender.com/api/predict/parkinsons', { 
        features: Object.values(features).map(val => parseFloat(val)) 
      });
      // console.log("response:", response);
      // console.log("actual value",response.data.prediction);
      
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      console.error('Prediction error', error);
      setError('Failed to predict Parkinson\'s disease');
      setPrediction(null);
    }
  };

  return (
    <div className="parkinsons-prediction">
      <h2>Parkinson's Disease Prediction</h2>
      <form onSubmit={predictParkinsons}>
        <div className="form-grid">
          {parkinsonsFields.map((field, index) => (
            <input
              key={index}
              type="number"
              name={field}
              placeholder={field}
              value={features[field]}
              onChange={handleInputChange}
              required
            />
          ))}
        </div>
        <button type="submit">Predict Parkinson's Disease</button>
      </form>

      {prediction !== null && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>{prediction === 1 ? 'Positive for Parkinson\'s Disease' : 'Negative for Parkinson\'s Disease'}</p>
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

export default ParkinsonsPrediction;












