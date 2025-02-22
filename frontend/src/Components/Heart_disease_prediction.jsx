import React, { useState } from 'react';
import axios from 'axios';

const HeartDiseasePrediction = () => {
  const [features, setFeatures] = useState({
    age: '',
    sex: '',
    chestPainTypes: '',
    restingBloodPressure: '',
    serumCholestoral: '',
    fastingBloodSugar: '',
    restingECGResults: '',
    maxHeartRate: '',
    exerciseInducedAngina: '',
    stDepressionExercise: '',
    slopeOfPeakExerciseSTSegment: '',
    majorVesselsColoredByFluoroscopy: '',
    thalStatus: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeatures(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const predictHeartDisease = async (e) => {
    e.preventDefault();
    try {
      // Convert features to numeric array
      const inputFeatures = Object.values(features).map(val => parseFloat(val));

      console.log("calling api call for heart disease prediction"); 
      const response = await axios.post('http://localhost:5000/api/predict/heart-disease', { 
      // const response = await axios.post('https://predictcareai.onrender.com/api/predict/heart-disease', { 
        features: inputFeatures 
      });
      
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      console.error('Prediction error', error);
      setError('Failed to predict heart disease');
      setPrediction(null);
    }
  };

  return (
    <div className="heart-disease-prediction">
      <h2>Heart Disease Prediction</h2>
      <form onSubmit={predictHeartDisease}>
        <div className="form-grid">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={features.age}
            onChange={handleInputChange}
            required
          />
          <select
            name="sex"
            value={features.sex}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Sex</option>
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>
          <select
            name="chestPainTypes"
            value={features.chestPainTypes}
            onChange={handleInputChange}
            required
          >
            <option value="">Chest Pain Types</option>
            <option value="0">Typical Angina</option>
            <option value="1">Atypical Angina</option>
            <option value="2">Non-Anginal Pain</option>
            <option value="3">Asymptomatic</option>
          </select>
          <input
            type="number"
            name="restingBloodPressure"
            placeholder="Resting Blood Pressure (mm Hg)"
            value={features.restingBloodPressure}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="serumCholestoral"
            placeholder="Serum Cholestoral (mg/dl)"
            value={features.serumCholestoral}
            onChange={handleInputChange}
            required
          />
          <select
            name="fastingBloodSugar"
            value={features.fastingBloodSugar}
            onChange={handleInputChange}
            required
          >
            <option value="">Fasting Blood Sugar more than 120 mg/dl</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
          <select
            name="restingECGResults"
            value={features.restingECGResults}
            onChange={handleInputChange}
            required
          >
            <option value="">Resting ECG Results</option>
            <option value="0">Normal</option>
            <option value="1">Having ST-T wave abnormality</option>
            <option value="2">Showing probable or definite left ventricular hypertrophy</option>
          </select>
          <input
            type="number"
            name="maxHeartRate"
            placeholder="Max Heart Rate Achieved"
            value={features.maxHeartRate}
            onChange={handleInputChange}
            required
          />
          <select
            name="exerciseInducedAngina"
            value={features.exerciseInducedAngina}
            onChange={handleInputChange}
            required
          >
           <option value="">Exercise Induced Angina</option>
           <option value="0">No</option>
           <option value="1">Yes</option>
         </select>
         <input
           type="number"
           name="stDepressionExercise"
           placeholder="ST Depression Induced by Exercise"
           value={features.stDepressionExercise}
           onChange={handleInputChange}
           required
         />
         <select
           name="slopeOfPeakExerciseSTSegment"
           value={features.slopeOfPeakExerciseSTSegment}
           onChange={handleInputChange}
           required
         >
           <option value="">Slope of Peak Exercise ST Segment</option>
           <option value="0">Upsloping</option>
           <option value="1">Flat</option>
           <option value="2">Downsloping</option>
         </select>
         <input
           type="number"
           name="majorVesselsColoredByFluoroscopy"
           placeholder="# of Major Vessels Colored by Fluoroscopy (0-3)"
           min="0"
           max="3"
           value={features.majorVesselsColoredByFluoroscopy}
           onChange={handleInputChange}
           required
         />
         <select
           name="thalStatus"
           value={features.thalStatus}
           onChange={handleInputChange}
           required
         >
           <option value="">Thalassemia Status</option>
           <option value="0">Normal</option>
           <option value="1">Fixed Defect</option>
           <option value="2">Reversible Defect</option>
         </select>

        </div>
        <button type="submit">Predict Heart Disease</button>
      </form>

      {prediction !== null && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>{prediction === 1 ? 'High risk of Heart Disease' : 'Low risk of Heart Disease'}</p>
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

export default HeartDiseasePrediction;
