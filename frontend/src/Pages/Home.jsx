import React from 'react'
import HealthCheckupPage from "./HealthCheckUpPage.jsx"
import DiabetesPage from "./DiabetesPage.jsx"
import HeartDiseasePage from "./HeartDiseasePage.jsx"
import ParkinsonsPage from "./ParkinsonDiseasePAge.jsx"
import AskQuestionsPage from "./AskquestionPage.jsx"
import LandingPage from "../Components/LandingPage.jsx"

const Home = () => {
  return (
    <div>
        <LandingPage />
        {/* <HealthCheckupPage /> */}
        <DiabetesPage />
        <HeartDiseasePage />
        <ParkinsonsPage />
        {/* <AskQuestionsPage /> */}
    </div>
  )
}

export default Home