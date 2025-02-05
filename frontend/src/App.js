import './App.css';
// import HeartDiseasePrediction from './Components/Heart_disease_prediction';
// import DiabetesPrediction from './Components/Diabetes_disease_prediction';
// import ParkinsonsPrediction from './Components/Parkinsons_disease_prediction';
// import ChatComponent from './Components/ChatComponent';
// import HealthAssessmentChat from './Components/HealthCheckUp';


// import LandingPage from './Components/LandingPage';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import Login from './Components/LoginPage';
// import SignUpForm  from './Components/SignUpPage';
import VerifyEmail from './Pages/VerifyEmail';
import MyProfile from './Components/Dashboard/MyProfile';



function App() {
  return (
    <div className="">
     {/* <HeartDiseasePrediction/>
      <DiabetesPrediction/>
      <ParkinsonsPrediction/>
      <ChatComponent/>
      <HealthAssessmentChat/> */}

      {/* <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
       */}

       {/* <SignUpForm/> */}

       {/* <VerifyEmail/> */}
        <MyProfile/>
        {/* <LandingPage/> */}

        {/* <Route path="dashboard/my-profile" element={<MyProfile />} /> */}
    </div>
  );
}

export default App;
