
import React, { useState } from 'react';
// import axios from 'axios';
import { apiConnector } from '../Service/apiConnector';
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../Slice/profileSlice.js';

const styles = {
  container: 'min-h-screen  p-6 ',
  innerContainer: 'max-w-[1200px] mx-auto',
  card: 'bg-richblack-700 backdrop-blur-sm bg-opacity-80 rounded-2xl border-[1px] p-8 border border-gray-100',
  header: 'text-center mb-10',
  // title: 'text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent',
  title:'bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-4xl',
  subtitle: 'text-gray-500 mt-2',
  
  // Enhanced tabs
  tabsContainer: 'flex flex-wrap mb-8 bg-gray-100 p-1.5 rounded-xl gap-2',
  tab: `px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 
        text-gray-600 hover:text-gray-800 flex items-center gap-2`,
  activeTab: `px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 
              bg-[#12D8FA] shadow-md text-white  font-medium flex items-center gap-2`,
  // activeTab: 'bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent rounded-xl text-white  font-bold px-6 py-3',
  tabIcon: 'w-5 h-5',
  
  // Form styling
  form: 'space-y-8',
  formGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  formGroup: 'space-y-2 relative group',
  label: `text-sm font-medium text-gray-700 transition-all duration-300 
          group-focus-within:text-blue-600`,
  
  // Enhanced input and select styling
  input: `w-full px-4 py-3 rounded-lg border border-gray-200 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
          transition-all duration-300 outline-none
          hover:border-gray-300 text-black`,
  select: `w-full px-4 py-3 rounded-lg border border-gray-200 
           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
           transition-all duration-300 outline-none appearance-none
           hover:border-gray-300`,
  
  // Button styling
  buttonContainer: 'mt-8',
  button: `w-full bg-gradient-to-r from-blue-500 to-indigo-600 
           text-white py-4 px-6 rounded-xl font-medium
           hover:from-blue-600 hover:to-indigo-700 
           transform transition-all duration-300
           hover:shadow-lg active:scale-[0.98]
           disabled:opacity-50 disabled:cursor-not-allowed`,
  
  // Results styling
  resultSuccess: `mt-6 p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 
                 border border-green-100 shadow-lg transform transition-all duration-300`,
  resultError: `mt-6 p-6 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 
                border border-red-100 shadow-lg transform transition-all duration-300`,
  resultTitle: 'text-lg font-semibold mb-2',
  resultText: 'text-gray-700',
  
  // Additional utility classes
  fieldset: 'border border-gray-200 rounded-xl p-6 bg-gray-50',
  legend: ' font-medium text-gray-600 px-2',
  tooltip: `absolute -top-10 left-1/2 transform -translate-x-1/2 
            bg-gray-800 text-white px-3 py-1 rounded text-sm
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            whitespace-nowrap z-10`,
  tooltipArrow: `absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                 border-t-4 border-gray-800 border-x-4 border-x-transparent`,
};



const DiseasePrediction = () => {
  
  const [activeTab, setActiveTab] = useState("diabetes");
  const {token}  =  useSelector((state) => state.auth)
  // const {setUser,user} = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const [task,setTask] = useState('')
  
  // Diabetes state
  const [diabetesFeatures, setDiabetesFeatures] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: ''
  });

  // Heart Disease state
  const [heartFeatures, setHeartFeatures] = useState({
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

  // Parkinsons state
  const parkinsonsFields = [
    'MDVP_Fo_Hz',
    'MDVP_Fhi_Hz',
    'MDVP_Flo_Hz',
    'MDVP_Jitter_%',
    'MDVP_Jitter_Abs',
    'MDVP_RAP',
    'MDVP_PPQ',
    'Jitter_DDP',
    'MDVP_Shimmer',
    'MDVP_Shimmer_dB',
    'Shimmer_APQ3',
    'Shimmer_APQ5',
    'MDVP_APQ',
    'Shimmer_DDA',
    'NHR',
    'HNR',
    'RPDE',
    'DFA',
    'Spread1',
    'Spread2',
    'D2',
    'PPE'
  ];

  const [parkinsonsFeatures, setParkinsonsFeatures] = useState(
    parkinsonsFields.reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, {})
  );

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleDiabetesInputChange = (e) => {
    setDiabetesFeatures({
      ...diabetesFeatures,
      [e.target.name]: e.target.value
    });
  };

  const handleHeartInputChange = (e) => {
    setHeartFeatures({
      ...heartFeatures,
      [e.target.name]: e.target.value
    });
  };

  const handleParkinsonsInputChange = (e) => {
    setParkinsonsFeatures({
      ...parkinsonsFeatures,
      [e.target.name]: e.target.value
    });
  };

  const predictDisease = async (e, disease) => {
    e.preventDefault();
    setPrediction(null);
    setError(null);
    const toastId = toast.loading("Uploading... Information")
    try {
      let response;
      switch (disease) {
        case 'diabetes':
          
          console.log('diabetes prediction api calling');
          // response = await axios.post('http://localhost:5000/api/predict/diabetes', {
          //   features: Object.values(diabetesFeatures).map(val => parseFloat(val))
          // });

          response = await apiConnector("POST",'https://predictcareai.onrender.com/api/predict/diabetes',{
            features: Object.values(diabetesFeatures).map(val => parseFloat(val))
          },{
            Authorization: `Bearer ${token}`,
          })
          console.log("diabetes api call response",response);
          dispatch(setUser(response.data.updatedUserDetails))
          // console.log("diabetes prediction end consoling user",user)

          break;
        case 'heart':
          console.log('heart prediction api calling');
          // response = await axios.post('http://localhost:5000/api/predict/heart-disease', {
          //   features: Object.values(heartFeatures).map(val => parseFloat(val))
          // });

          response = await apiConnector("POST",'https://predictcareai.onrender.com/api/predict/heart-disease',{
            features: Object.values(heartFeatures).map(val => parseFloat(val))
          },{
            Authorization: `Bearer ${token}`,
          })
          console.log("Heart Disease api call response",response);  
          dispatch(setUser(response.data.updatedUserDetails))
          // console.log("Heart disease prediction done end now consoling user",user)
          break;
        case 'parkinsons':
          console.log('parkinsons prediction api calling');
          // response = await axios.post('http://localhost:5000/api/predict/parkinsons', {
          //   features: Object.values(parkinsonsFeatures).map(val => parseFloat(val))
          // });

          response = await apiConnector("POST",'https://predictcareai.onrender.com/api/predict/parkinsons',{
            features: Object.values(parkinsonsFeatures).map(val => parseFloat(val))
          },{
            Authorization: `Bearer ${token}`,
          })
          console.log("parkinsons disease api call response",response);
          dispatch(setUser(response.data.updatedUserDetails))
          
          break;
        default:
          throw new Error('Invalid disease type');
      }
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Prediction error', error);
      setError(`Failed to predict ${disease}`);
      toast.error("Could Not Upload Information, Server Is Down")
    }
    toast.dismiss(toastId)
  };


  return (
    <div className={`${styles.container} mt-[15vh] bg-richblack-900  `}>
      <div className={styles.innerContainer}>
        <div className={styles.card}>
          <header className={styles.header}>
            <h1 className={styles.title}>Medical Condition Prediction System</h1>
            <p className={styles.subtitle}>
              Advanced AI-powered analysis for early detection and risk assessment
            </p>
          </header>

          <div className={`{styles.tabsContainer} mb-[2vh] rounded-lg`  }>
            <button 
              className={`${activeTab === "diabetes" ? styles.activeTab : styles.tab} w-fit `}
              onClick={() => setActiveTab("diabetes")}
            >
              <svg className={styles.tabIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Diabetes
            </button>
            <button 
              className={activeTab === "heart" ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab("heart")}
            >
              <svg className={styles.tabIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Heart Disease
            </button>
            <button 
              className={activeTab === "parkinsons" ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab("parkinsons")}
            >
              <svg className={styles.tabIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Parkinson's
            </button>
          </div>

          {/* diabetes */}
          {activeTab === "diabetes" && (
            <form onSubmit={(e) => predictDisease(e, 'diabetes')} className={styles.form}>
              <fieldset className={styles.fieldset}>
                <h2 className={`mt-[0vh] text-2xl pb-5 font-thin text-black `}>Diabetes Risk Assessment</h2>
                <div className={styles.formGrid}>
                  {Object.entries(diabetesFeatures).map(([key, value]) => (
                    <div key={key} className={styles.formGroup}>
                      <label className={styles.label}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        name={key}
                        value={value}
                        onChange={handleDiabetesInputChange}
                        required
                        placeholder={`Enter ${key.toLowerCase()}`}
                      />
                      <div className={styles.tooltip}>
                        Enter value for {key}
                        <div className={styles.tooltipArrow} />
                      </div> 
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}
                onClick={() => setTask('diabetes')}>
                  Analyze Diabetes Risk
                </button>
              </div>
            </form>
          )}

          {/* health Disease */}
          {activeTab === "heart" && (
            <form onSubmit={(e) => predictDisease(e, 'heart')} className={styles.form}>
              <fieldset className={styles.fieldset}>
                <h2 className={`mt-[0vh] text-2xl pb-5 font-thin text-black `}>Heart Disease Risk Assessment</h2>
                <div className={styles.formGrid}>
                  {/* {Object.entries(heartFeatures).map(([key, value]) => (
                     <div key={key} className={styles.formGroup}>
                      <label className={styles.label}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="number"
                        name={key}
                        value={value}
                        className={styles.input}
                        onChange={handleHeartInputChange}
                        placeholder={`Enter ${key.toLowerCase()}`}
                        required
                      />
                      <div className={styles.tooltip}>
                        Enter value for {key}
                        <div className={styles.tooltipArrow} />
                      </div>
                    </div>
                  ))}  */}



                    <div  className={styles.formGroup}>
                      <label className={styles.label}>
                        Age
                      </label>
                        <input
                          type="number"
                          name="age"
                          placeholder="Enter Age"
                          value={heartFeatures.age}
                          className={styles.input}
                        onChange={handleHeartInputChange}
                        // placeholder={`Enter ${key.toLowerCase()}`}
                          required
                        />
                    </div>


                        <div  className={styles.formGroup}>
                          <label className={styles.label}>
                          Sex
                          </label>
                          <select
                            name="sex"
                            value={heartFeatures.sex}
                            className={styles.input}
                            onChange={handleHeartInputChange}
                            placeholder="Enter Sex "
                            required
                            >
                            <option value="">Select Sex</option>
                            <option value="0">Female</option>
                            <option value="1">Male</option>
                          </select>
                        </div>

                          <div className={styles.formGroup}>
                            <label className={styles.label}>
                            Chest Pain Types
                            </label>
                            <select
                              name="chestPainTypes"
                              value={heartFeatures.chestPainTypes}
                              className={styles.input}
                              onChange={handleHeartInputChange}
                              placeholder="Enter Chest Pain Types"
                              required
                              >
                              <option value="">Chest Pain Types</option>
                              <option value="0">Typical Angina</option>
                              <option value="1">Atypical Angina</option>
                              <option value="2">Non-Anginal Pain</option>
                              <option value="3">Asymptomatic</option>
                            </select>
                          </div>

                          <div  className={styles.formGroup}>
                            <label className={styles.label}>
                            Resting Blood Pressure
                          </label>
                          <input
                            type="number"
                            name="restingBloodPressure"
                            placeholder="Resting Blood Pressure (mm Hg)"
                            value={heartFeatures.restingBloodPressure}
                            className={styles.input}
                            onChange={handleHeartInputChange}
                            // placeholder="E"
                            required
                            />

                          </div>

                          <div  className={styles.formGroup}>
                              <label className={styles.label}>
                              Serum Cholestoral
                              </label>
                              <input
                                type="number"
                                name="serumCholestoral"
                                placeholder="Serum Cholestoral (mg/dl)"
                                value={heartFeatures.serumCholestoral}
                                className={styles.input}
                                onChange={handleHeartInputChange}
                                // placeholder={`Enter ${key.toLowerCase()}`}
                                required
                                />

                          </div>

                          <div  className={styles.formGroup}>

                              <label className={styles.label}>
                              Fasting Blood Sugar
                              </label>
                              <select
                                name="fastingBloodSugar"
                                value={heartFeatures.fastingBloodSugar}
                                className={styles.input}
                                onChange={handleHeartInputChange}
                                placeholder="Enter fasting Blood Sugar"
                                required
                                >
                                <option value="">Fasting Blood Sugar more than 120 mg/dl</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                              </select>

                          </div>


                          <div  className={styles.formGroup}>
                            <label className={styles.label}>
                            Resting E C G Results
                          </label>
                            <select
                              name="restingECGResults"
                              value={heartFeatures.restingECGResults}
                              className={styles.input}
                              onChange={handleHeartInputChange}
                              placeholder="Enter Resting ECG Results"
                              required
                              >
                              <option value="">Resting ECG Results</option>
                              <option value="0">Normal</option>
                              <option value="1">Having ST-T wave abnormality</option>
                              <option value="2">Showing probable or definite left ventricular hypertrophy</option>
                            </select>

                          </div>



                          <div  className={styles.formGroup}>
                              <label className={styles.label}>
                              Max Heart Rate
                            </label>
                              <input
                                type="number"
                                name="maxHeartRate"
                                placeholder="Max Heart Rate Achieved"
                                value={heartFeatures.maxHeartRate}
                                className={styles.input}
                                onChange={handleHeartInputChange}
                                // placeholder={`Enter ${key.toLowerCase()}`}
                                required
                                />
                          </div>


                          <div  className={styles.formGroup}>
                              <label className={styles.label}>
                              Exercise Induced Angina
                            </label>
                              <select
                                name="exerciseInducedAngina"
                                value={heartFeatures.exerciseInducedAngina}
                                className={styles.input}
                                onChange={handleHeartInputChange}
                                placeholder="Enter Exercise Induces Angina"
                                required
                                >
                              <option value="">Exercise Induced Angina</option>
                              <option value="0">No</option>
                              <option value="1">Yes</option>
                            </select>
                          </div>


                          <div  className={styles.formGroup}>
                            <label className={styles.label}>
                            ST Depression Exercise
                            </label>
                            <input
                              type="number"
                              name="stDepressionExercise"
                              placeholder="ST Depression Induced by Exercise"
                              value={heartFeatures.stDepressionExercise}
                              className={styles.input}
                              onChange={handleHeartInputChange}
                              // placeholder={`Enter ${key.toLowerCase()}`}
                              required
                              />
                        </div>


                        <div  className={styles.formGroup}>
                          <label className={styles.label}>
                          Slope Of Peak Exercise ST Segment
                          </label>
                          <select
                            name="slopeOfPeakExerciseSTSegment"
                            value={heartFeatures.slopeOfPeakExerciseSTSegment}
                            className={styles.input}
                            onChange={handleHeartInputChange}
                            placeholder="Enter Slope Of Exercise"
                            required
                            >
                            <option value="">Slope of Peak Exercise ST Segment</option>
                            <option value="0">Upsloping</option>
                            <option value="1">Flat</option>
                            <option value="2">Downsloping</option>
                          </select>
                        </div>



                        <div className={styles.formGroup}>
                          <label className={styles.label}>
                          Major Vessels Colored By Fluoroscopy
                          </label>
                          <input
                            type="number"
                            name="majorVesselsColoredByFluoroscopy"
                            placeholder="Enter No. of Major Vessels Colored by Fluoroscopy (0-3)"
                            min="0"
                            max="3"
                            value={heartFeatures.majorVesselsColoredByFluoroscopy}
                            className={styles.input}
                            onChange={handleHeartInputChange}
                            // placeholder={`Enter ${key.toLowerCase()}`}
                            required
                            />
                        </div>





                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                        Thal Status
                        </label>
                        <select
                          name="thalStatus"
                          value={heartFeatures.thalStatus}
                          className={styles.input}
                          onChange={handleHeartInputChange}
                          placeholder="Enter Thal Status"
                          required
                          >
                          <option value="">Thalassemia Status</option>
                          <option value="0">Normal</option>
                          <option value="1">Fixed Defect</option>
                          <option value="2">Reversible Defect</option>
                        </select>
                    </div>
                      

                  
                    


                </div>
              </fieldset>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}
                onClick={() => setTask('heart')}>
                  Analyze Heart Disease Risk
                </button>
              </div>
            </form>
          )}

          {/* Parkinsons */}
          {activeTab === "parkinsons" && (
            <form onSubmit={(e) => predictDisease(e, 'parkinsons')} className={styles.form}>
              <fieldset className={styles.fieldset}>
                <h2 className={`mt-[0vh] text-2xl pb-5 font-thin text-black `}>Parkinsons Disease Risk Assessment</h2>
                <div className={styles.formGrid}>
                  {/* {Object.entries(parkinsonsFields).map(([key, value]) => (
                    <div key={key} className={styles.formGroup}>
                      <label className={styles.label}>
                      {parkinsonsFields[`${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}`]}
                      </label>
                      <input
                        type="number"
                        className={`${styles.input} text-blac_`}
                        name={key}
                        value={value}
                        onChange={handleParkinsonsInputChange}
                        required
                        placeholder={`Enter ${parkinsonsFields[key.toLowerCase()]}`}
                      />
                      <div className={styles.tooltip}>
                        Enter value for {parkinsonsFields[key.toLowerCase()]}
                        <div className={styles.tooltipArrow} />
                      </div>
                    </div>
                  ))} */}

                    {parkinsonsFields.map((field, index) => (
                      <div key={index} className={styles.formGroup}>
                        <label className={styles.label}>{field.replace(/_/g, ' ')}</label>
                        <input
                          type="number"
                          className={`${styles.input} text-black`}
                          name={field}  // Set correct field name
                          value={parkinsonsFeatures[field]} // Get the correct value
                          onChange={handleParkinsonsInputChange} // Call handler function
                          required
                          placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                        />
                        <div className={styles.tooltip}>
                          Enter value for {field.replace(/_/g, ' ')}
                          <div className={styles.tooltipArrow} />
                        </div>
                      </div>
                    ))}
                </div>
              </fieldset>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}
                onClick={() => setTask('parkinson')}>
                  Analyze Parkinsonism Risk
                </button>
              </div>
            </form>
          )}

         

          {prediction !== null && (
            <div className={styles.resultSuccess}>
              <h3 className={`${styles.resultTitle} text-black`}>Analysis Results</h3>
              <p className={styles.resultText}>
                {console.log("task",task)}
                {activeTab === 'diabetes' && task==='diabetes' && (
                  prediction === 1 
                    ? '🔴 High probability of diabetes detected. Please consult a healthcare provider.' 
                    : '🟢 Low probability of diabetes detected. Maintain a healthy lifestyle.'
                )}
                {activeTab === 'heart'  && task === 'heart' && (
                  prediction === 1 
                    ? '🔴 High risk of heart disease detected. Please consult a cardiologist.' 
                    : '🟢 Low risk of heart disease detected. Maintain heart-healthy habits.'
                )}
                {activeTab === 'parkinsons' && task === 'parkinson' && (
                  prediction === 1 
                    ? '🔴 Indicators of Parkinson\'s disease detected. Please consult a neurologist.' 
                    : '🟢 No significant indicators of Parkinson\'s disease detected.'
                )}
              </p>
            </div>
          )}

          {error && (
            <div className={styles.resultError}>
              <h3 className={`${styles.resultTitle} text-black`}>Error</h3>
              <p className={styles.resultText}>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseasePrediction;




