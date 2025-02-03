import './App.css';
import HeartDiseasePrediction from './Components/Heart_disease_prediction';
import DiabetesPrediction from './Components/Diabetes_disease_prediction';
import ParkinsonsPrediction from './Components/Parkinsons_disease_prediction';
import ChatComponent from './Components/ChatComponent';
import HealthAssessmentChat from './Components/HealthCheckUp';

function App() {
  return (
    <div className="">
     <HeartDiseasePrediction/>
      <DiabetesPrediction/>
      <ParkinsonsPrediction/>
      <ChatComponent/>
      <HealthAssessmentChat/>
    </div>
  );
}

export default App;
