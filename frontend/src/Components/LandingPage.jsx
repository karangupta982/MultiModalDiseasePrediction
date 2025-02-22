// "use client"

// import { useEffect, useRef } from "react"
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { 
  Brain, 
  Heart, 
  Activity, 
  MessageSquare, 
  ClipboardCheck,
  ArrowRight
} from 'lucide-react';



export default function Home() {




  return(

      <main className="relative min-h-screen bg-richBlack mt-[15vh] md:mt-[5vh]">
        
      {/* <main className="relative min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]"> */}
      {/* <div className="absolute inset-0 z-0 pt-[10vh]" /> */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white ">
        <div className="w-[83vw] bg-gradient-to-r from-[#1e293b] to-[#334155] rounded-xl backdrop-blur-lg shadow-xl border border-[#475569] p-8 ">
        
          <div className="text-center mt-[2vh]">

            <TypeAnimation
              className="h-full text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-[#60a5fa] to-[#818cf8] text-transparent bg-clip-text font-bold tracking-wide"
              sequence={[
                'Advanced ML Disease Prediction...',
                1000,
                'Precision Heart Disease Analysis...',
                1000,
                'Smart Diabetes Risk Assessment...',
                1000,
                "Parkinson's Detection AI...",
                1000,
                'Intelligent Health Checkup...',
                1000,
                'AI Medical Chat Assistant...',
                1000,
                'Comprehensive Health Analysis...',
                1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <h1 className="text-center mt-[4vh] text-xl  text-[#cbd5e1]">
            Experience rapid, reliable disease predictions powered by advanced machine learning models.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
            <div className="p-6 bg-gradient-to-br from-[#1e293b]/50 to-[#334155]/50 rounded-lg border border-[#475569]/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-6 h-6 text-[#60a5fa]" />
                <h3 className="text-lg font-semibold text-[#f1f5f9]">Heart Disease Analysis</h3>
              </div>
              <p className="text-[#94a3b8] text-sm">Advanced ML model trained on comprehensive cardiac data for accurate heart disease risk assessment</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#1e293b]/50 to-[#334155]/50 rounded-lg border border-[#475569]/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-6 h-6 text-[#818cf8]" />
                <h3 className="text-lg font-semibold text-[#f1f5f9]">Diabetes Prediction</h3>
              </div>
              <p className="text-[#94a3b8] text-sm">State-of-the-art diabetes risk prediction using multiple health parameters and machine learning</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#1e293b]/50 to-[#334155]/50 rounded-lg border border-[#475569]/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-6 h-6 text-[#60a5fa]" />
                <h3 className="text-lg font-semibold text-[#f1f5f9]">Parkinson's Detection</h3>
              </div>
              <p className="text-[#94a3b8] text-sm">Early Parkinson's disease detection through advanced pattern recognition algorithms</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#1e293b]/50 to-[#334155]/50 rounded-lg border border-[#475569]/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-[#818cf8]" />
                <h3 className="text-lg font-semibold text-[#f1f5f9]">AI Medical Chat</h3>
              </div>
              <p className="text-[#94a3b8] text-sm">Intelligent medical assistant powered by advanced model for personalized health guidance</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#1e293b]/50 to-[#334155]/50 rounded-lg border border-[#475569]/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <ClipboardCheck className="w-6 h-6 text-[#60a5fa]" />
                <h3 className="text-lg font-semibold text-[#f1f5f9]">Health Checkup</h3>
              </div>
              <p className="text-[#94a3b8] text-sm">Comprehensive health assessment through interactive questionnaire and AI analysis</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#1e293b]/50 to-[#334155]/50 rounded-lg border border-[#475569]/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center">
              <Link to="/login" className="group flex items-center gap-2 text-[#f1f5f9] hover:text-[#60a5fa] transition-colors duration-300">
                <span className="text-lg font-semibold">Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-[2vw] translate-y-[4vh]">
          <Link
            to="/signup"
            className="px-[1vw] py-[1vh] rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#6366f1] text-white font-mono font-light tracking-wide shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/health-checkup"
            className="px-[1vw] py-[1vh] rounded-xl bg-gradient-to-r from-[#6366f1] to-[#3b82f6] text-white font-mono font-light tracking-wide shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Health Checkup
          </Link>
        </div>
      </div>
    </main>


      
  )




}






// shadow-[20px_-20px_50px_rgba(255,0,0,0.2),90px_-20px_50px_rgba(255,0,0,0.2),-40px_-80px_50px_rgba(255,0,0,0.4)]