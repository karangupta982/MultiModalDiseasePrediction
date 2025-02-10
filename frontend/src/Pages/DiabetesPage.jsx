// import React from 'react';

// // Diabetes Page
// function DiabetesPage() {
//   return (
//     <div className="bg-gray-900 text-white min-h-screen px-6 py-10">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8">Understanding Diabetes</h1>
//         <p className="text-lg leading-relaxed mb-6">
//           Diabetes is a chronic condition that affects how your body turns food into energy. There
//           are two main types: <strong>Type 1</strong> and <strong>Type 2</strong>. While Type 1 is
//           often diagnosed in children and young adults, Type 2 is more common in adults and linked
//           to lifestyle factors.
//         </p>
//         <img
//           src="https://via.placeholder.com/800x400"
//           alt="Diabetes awareness"
//           className="rounded-xl mx-auto mb-6"
//         />
//         <h2 className="text-2xl font-semibold mb-4">Symptoms of Diabetes</h2>
//         <ul className="list-disc list-inside mb-6">
//           <li>Increased thirst and hunger</li>
//           <li>Frequent urination</li>
//           <li>Fatigue and blurred vision</li>
//           <li>Slow-healing wounds</li>
//         </ul>
//         <h2 className="text-2xl font-semibold mb-4">Prevention and Management</h2>
//         <p className="text-lg leading-relaxed">
//           Healthy eating, regular exercise, and routine health checkups are essential for managing
//           diabetes and reducing risks.
//         </p>
//         <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-full mt-6">
//           Learn More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DiabetesPage

// // Heart Disease Page





















// // DiabetesPage.jsx  by Deepseek
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls, Sphere } from '@react-three/drei'

// const DiabetesPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       {/* Hero Section */}
//       <section className="relative h-96">
//         <Canvas className="absolute top-0 left-0 w-full h-96">
//           <ambientLight intensity={0.5} />
//           {/* <pointLight position={10, 10, 10} /> */}
//           <pointLight position={[10, 10, 10]} />
//           <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
//             <meshStandardMaterial color="#3182ce" transparent opacity={0.8} />
//           </Sphere>
//           <OrbitControls enableZoom={false} autoRotate />
//         </Canvas>
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
//           <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
//             Diabetes Awareness
//           </h1>
//           <p className="text-xl text-white/90 max-w-2xl mx-auto">
//             Understanding and managing diabetes for better health outcomes
//           </p>
//         </div>
//       </section>

//       {/* Content Section */}
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
//           <img 
//             src="/diabetes-infographic.jpg" 
//             alt="Diabetes Management"
//             className="rounded-xl shadow-xl hover:scale-105 transition-transform"
//           />
//           <div>
//             <h2 className="text-3xl font-semibold text-gray-800 mb-4">
//               What is Diabetes?
//             </h2>
//             <p className="text-gray-600 leading-relaxed">
//               Diabetes is a chronic metabolic disorder characterized by elevated blood sugar levels. 
//               Our AI model analyzes 15+ factors including age, BMI, and genetic markers to assess 
//               your risk factors and provide personalized recommendations.
//             </p>
//           </div>
//         </div>

//         {/* Symptoms Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
//           <h3 className="text-2xl font-semibold text-blue-600 mb-6">
//             Key Symptoms to Watch For
//           </h3>
//           <div className="grid md:grid-cols-3 gap-6">
//             {['Increased Thirst', 'Frequent Urination', 'Blurred Vision'].map((symptom) => (
//               <div key={symptom} className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
//                 <span className="text-blue-600 font-medium">{symptom}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="text-center py-12">
//           <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
//             Check Your Diabetes Risk
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DiabetesPage;






// revised by Deepseek

// DiabetesPage.jsx
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Link } from 'react-router-dom';
// Custom color theme configuration (add to tailwind.config.js)
const themeColors = {
  richBlack: '#010B13',
  accentTeal: '#2DD4BF',
  accentGold: '#FACC15',
  lightGray: '#F3F4F6'
};

const DiabetesPage = () => {
  return (
    <div className="min-h-screen bg-richBlack text-lightGray mb-[5vh] ">
      {/* Hero Section */}
      <section className="relative mb-[10vh] mt-[20vh] overflow-hidden" >
       

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl h-[6vh] font-bold mb-6 bg-gradient-to-r from-accentTeal to-accentGold bg-clip-text text-transparent">
              Diabetes Intelligence
            </h1>
            <p className="text-xl text-lightGray/80 mb-8">
              Advanced predictive analytics for diabetes risk assessment and management
            </p>
            <Link to="/predict">
              <button 
              className="bg-accentTeal/90 rounded-xl text-richBlack px-8 py-3  font-semibold hover:bg-accentGold transition-all transform hover:scale-105">
                Start Risk Assessment
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 ">
        {/* Info Grid */}
        <div className="flex justify-between gap-16 items-center mb-20">


              <div className="z-[0] w-1/2 h-[50vh] ">
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                className="w-full h-full"
              >
                {/* Scene Setup */}
                <color attach="background" args={[themeColors.richBlack]} />
                <ambientLight intensity={1.5} />
                <pointLight 
                  position={[5, 5, 5]} 
                  intensity={2}
                  color={themeColors.accentTeal}
                />
                <directionalLight
                  position={[-5, 5, 5]}
                  intensity={1}
                  color={themeColors.accentGold}
                />
                
                {/* Main Sphere */}
                <Sphere args={[1.8, 64, 64]} position={[0, 0, 0]}>
                  <meshStandardMaterial 
                    color={themeColors.accentTeal}
                    emissive={themeColors.accentTeal}
                    emissiveIntensity={0.3}
                    metalness={0.3}
                    roughness={0.2}
                    transparent
                    opacity={0.9}
                  />
                </Sphere>
                
                {/* Visual Helpers (optional) */}
                {/* <gridHelper args={[10, 10]} /> */}
                <OrbitControls 
                  enableZoom={false} 
                  autoRotate
                  autoRotateSpeed={2}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 3}
                />
              </Canvas>
              </div>

              <div className="w-1/2">
                <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6">Understanding Diabetes</h2>
              <p className="text-lightGray/80 leading-relaxed mb-6">
                Diabetes mellitus affects over 422 million people worldwide. Our AI-driven platform 
                analyzes 25+ biomarkers including glucose levels, insulin resistance, and genetic 
                predispositions to provide accurate risk predictions.
              </p>
              <div className="space-y-4">
                {['HbA1c Tracking', 'Insulin Analysis', 'Lifestyle Impact'].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accentTeal rounded-full" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
                </motion.div>
              </div>
        </div>

        {/* Symptoms Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-richBlack border border-accentTeal/20 rounded-2xl p-8 mb-20"
        >
          <h3 className="text-2xl font-bold mb-8">Key Indicators</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Blood Sugar Levels', value: '70-130 mg/dL' },
              { title: 'HbA1c Percentage', value: '<5.7% Normal' },
              { title: 'Insulin Sensitivity', value: 'Optimal Range' }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-6 bg-richBlack/80 border border-accentTeal/10 rounded-xl hover:border-accentTeal/30 transition-all"
              >
                <h4 className="text-accentTeal font-semibold mb-2">{item.title}</h4>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Take Control of Your Health</h3>
          <p className="text-lightGray/80 mb-8 max-w-2xl mx-auto">
            Our predictive models combine machine learning with clinical research to provide 
            personalized insights and prevention strategies.
          </p>
          {/* <button className="bg-accentTeal text-richBlack px-8 py-3 rounded-lg font-semibold hover:bg-accentTeal/90 transition-all transform hover:scale-105">
            Start Health Assessment
          </button> */}
          <div className="my-[6vh]">
          <Link to="/health-checkup" className="px-[1vw] py-[1.5vh] shadow-[5px_5px_20px_#4338ca,-5px_5px_20px_#4338ca,5px_-5px_20px_#4338ca,-5px_-5px_20px_#4338ca]  rounded-xl shadow-accentTeal transform hover:scale-105 hover:bg-accentTeal/90 hover:shadow-none  ">Start Health Assessment</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DiabetesPage;