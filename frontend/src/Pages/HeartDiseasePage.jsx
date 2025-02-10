// function HeartDiseasePage() {
//     return (
//       <div className="bg-gray-900 text-white min-h-screen px-6 py-10">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-4xl font-bold text-center mb-8">Understanding Heart Disease</h1>
//           <p className="text-lg leading-relaxed mb-6">
//             Heart disease refers to various conditions that affect the heart, including coronary artery
//             disease, arrhythmias, and heart defects. It's a leading cause of death globally, but many
//             forms are preventable with lifestyle changes.
//           </p>
//           <img
//             src="https://via.placeholder.com/800x400"
//             alt="Heart health awareness"
//             className="rounded-xl mx-auto mb-6"
//           />
//           <h2 className="text-2xl font-semibold mb-4">Common Symptoms</h2>
//           <ul className="list-disc list-inside mb-6">
//             <li>Chest pain or discomfort</li>
//             <li>Shortness of breath</li>
//             <li>Fatigue</li>
//             <li>Irregular heartbeat</li>
//           </ul>
//           <h2 className="text-2xl font-semibold mb-4">Prevention Tips</h2>
//           <p className="text-lg leading-relaxed">
//             Maintain a healthy diet, exercise regularly, avoid smoking, and get regular medical checkups
//             to keep your heart healthy.
//           </p>
//           <button className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-full mt-6">
//             Learn More
//           </button>
//         </div>
//       </div>
//     );
//   };



//   export default HeartDiseasePage
















// Deepseek
// HeartDiseasePage.jsx
// import { motion } from 'framer-motion';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Torus } from '@react-three/drei';

// const themeColors = {
//   richBlack: '#010B13',
//   accentGold: '#FACC15',
//   accentRed: '#DC2626',
//   lightGray: '#F3F4F6'
// };

// const HeartDiseasePage = () => {
//   return (
//     <div className="min-h-screen bg-richBlack text-lightGray">
//       {/* Hero Section */}
//       <section className="relative h-[600px] overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <Canvas 
//             camera={{ position: [0, 0, 5], fov: 50 }}
//             className="w-full h-full"
//           >
//             <color attach="background" args={[themeColors.richBlack]} />
//             <ambientLight intensity={1.2} />
//             <pointLight 
//               position={[5, 5, 5]} 
//               intensity={1.5}
//               color={themeColors.accentRed}
//             />
//             <directionalLight
//               position={[-5, 5, 5]}
//               intensity={0.8}
//               color={themeColors.accentGold}
//             />
            
//             <Torus args={[1, 0.4, 16, 100]} position={[0, 0, 0]}>
//               <meshStandardMaterial 
//                 color={themeColors.accentRed}
//                 emissive={themeColors.accentRed}
//                 emissiveIntensity={0.2}
//                 metalness={0.4}
//                 roughness={0.3}
//                 transparent
//                 opacity={0.9}
//               />
//             </Torus>
            
//             <OrbitControls 
//               enableZoom={false} 
//               autoRotate
//               autoRotateSpeed={1.8}
//               minPolarAngle={Math.PI / 3.5}
//               maxPolarAngle={Math.PI / 1.8}
//             />
//           </Canvas>
//         </div>

//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
//         >
//           <div className="max-w-4xl mx-auto">
//             <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-accentRed to-accentGold bg-clip-text text-transparent">
//               Cardiac Health Analytics
//             </h1>
//             <p className="text-xl text-lightGray/80 mb-8">
//               Advanced predictive monitoring for cardiovascular risk assessment
//             </p>
//             <button className="bg-accentRed/90 text-richBlack px-8 py-3 rounded-lg font-semibold hover:bg-accentRed transition-all transform hover:scale-105">
//               Start Heart Assessment
//             </button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Content Section */}
//       <div className="max-w-7xl mx-auto px-4 py-20">
//         {/* Info Grid */}
//         <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             className="relative group"
//           >
//             <div className="absolute -inset-2 bg-accentRed/20 rounded-3xl transform group-hover:scale-105 transition-all" />
//             <img 
//               src="/medical-illustrations/heart-anatomy.jpg"
//               alt="Heart Anatomy"
//               className="rounded-2xl transform transition-all group-hover:scale-101"
//             />
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//           >
//             <h2 className="text-3xl font-bold mb-6">Understanding Heart Disease</h2>
//             <p className="text-lightGray/80 leading-relaxed mb-6">
//               Cardiovascular diseases account for 32% of global deaths. Our AI platform analyzes 
//               30+ cardiac indicators including ECG patterns, cholesterol levels, and arterial 
//               pressure to predict potential risks with 94% accuracy.
//             </p>
//             <div className="space-y-4">
//               {['Blood Pressure', 'Cholesterol Levels', 'ECG Patterns'].map((feature) => (
//                 <div key={feature} className="flex items-center space-x-3">
//                   <div className="w-2 h-2 bg-accentRed rounded-full" />
//                   <span className="font-medium">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* Risk Factors Section */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           className="bg-richBlack border border-accentRed/20 rounded-2xl p-8 mb-20"
//         >
//           <h3 className="text-2xl font-bold mb-8">Critical Metrics</h3>
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { title: 'Blood Pressure', value: '120/80 mmHg' },
//               { title: 'Cholesterol', value: '<200 mg/dL' },
//               { title: 'Resting HR', value: '60-100 bpm' }
//             ].map((item, index) => (
//               <div 
//                 key={index}
//                 className="p-6 bg-richBlack/80 border border-accentRed/10 rounded-xl hover:border-accentRed/30 transition-all"
//               >
//                 <h4 className="text-accentRed font-semibold mb-2">{item.title}</h4>
//                 <p className="text-2xl font-bold">{item.value}</p>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Prevention Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-center mb-20"
//         >
//           <h3 className="text-2xl font-bold mb-6">Preventive Measures</h3>
//           <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
//             {['Diet Analysis', 'Exercise Plan', 'Stress Tests', 'Sleep Patterns'].map((item) => (
//               <div key={item} className="p-4 bg-richBlack/50 rounded-xl border border-accentRed/10">
//                 <span className="text-accentRed font-semibold">{item}</span>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* CTA Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-center"
//         >
//           <h3 className="text-2xl font-bold mb-6">Take Charge of Your Heart Health</h3>
//           <p className="text-lightGray/80 mb-8 max-w-2xl mx-auto">
//             Our neural networks analyze complex cardiac patterns to detect anomalies 
//             months before traditional methods.
//           </p>
//           <button className="bg-accentRed text-richBlack px-8 py-3 rounded-lg font-semibold hover:bg-accentRed/90 transition-all transform hover:scale-105">
//             Begin Cardiac Evaluation
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default HeartDiseasePage;





// revised
// HeartDiseasePage.jsx
// HeartDiseasePage.jsx
import { motion } from 'framer-motion';
import heart from '../assets/heart.jpg'
import { Link } from 'react-router-dom';

// const themeColors = {
//   richBlack: '#010B13',
//   accentCoral: '#FF6B6B',
//   accentSky: '#7ED6DF',
//   lightGray: '#F3F4F6'
// };

const HeartDiseasePage = () => {
  return (
    <div className="min-h-screen bg-richBlack text-lightGray ">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-richBlack/90 to-richBlack/50 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl h-[6vh] font-bold mb-6 bg-gradient-to-r from-accentCoral to-accentSky bg-clip-text text-transparent">
              Cardiac Health Intelligence
            </h1>
            <p className="text-xl text-lightGray/80 mb-8">
              Comprehensive heart health analysis and preventive care solutions
            </p>
            <Link to="/predict">
              <button 
              className="bg-accentCoral rounded-xl text-richBlack px-8 py-3  font-semibold hover:bg-accentSky transition-all transform hover:scale-105">
                Start Risk Assessment
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <div className="absolute -inset-2  rounded-3xl transform group-hover:scale-105 transition-all" />
            <img 
              src={heart}
              alt="Heart Anatomy"
              className="rounded-2xl transform transition-all group-hover:scale-101"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold mb-6">Understanding Heart Disease</h2>
            <p className="text-lightGray/80 leading-relaxed mb-6">
              Cardiovascular diseases are the leading cause of death globally, accounting for 
              approximately 17.9 million deaths each year. Our platform provides comprehensive 
              risk assessment and preventive strategies based on clinical research and AI analysis.
            </p>
            <div className="space-y-4">
              {['Coronary Artery Disease', 'Heart Attacks', 'Arrhythmias', 'Heart Failure'].map((condition) => (
                <div key={condition} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accentCoral rounded-full" />
                  <span className="font-medium">{condition}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Risk Factors Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-richBlack/80 border border-accentCoral/20 rounded-2xl p-8 mb-20"
        >
          <h3 className="text-2xl font-bold mb-8">Key Risk Factors</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'High Blood Pressure', icon: '💓' },
              { title: 'High Cholesterol', icon: '🩸' },
              { title: 'Diabetes', icon: '🩺' },
              { title: 'Obesity', icon: '⚖️' },
              { title: 'Smoking', icon: '🚬' },
              { title: 'Physical Inactivity', icon: '🏃' }
            ].map((factor, index) => (
              <div 
                key={index}
                className="p-6 bg-richBlack/50 border border-accentCoral/10 rounded-xl hover:border-accentCoral/30 transition-all"
              >
                <div className="text-3xl mb-3">{factor.icon}</div>
                <h4 className="text-accentCoral font-semibold">{factor.title}</h4>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Prevention Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold mb-6">Prevention Strategies</h3>
            <div className="space-y-4">
              {[
                'Maintain healthy blood pressure levels',
                'Control cholesterol through diet and medication',
                'Manage diabetes effectively',
                'Engage in regular physical activity',
                'Maintain a healthy weight',
                'Avoid tobacco use'
              ].map((strategy, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accentSky rounded-full mt-2" />
                  <span className="text-lightGray/80">{strategy}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-richBlack/80 border border-accentSky/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Heart Health Metrics</h3>
            <div className="space-y-6">
              {[
                { metric: 'Blood Pressure', ideal: '<120/80 mmHg' },
                { metric: 'Cholesterol', ideal: '<200 mg/dL' },
                { metric: 'Resting Heart Rate', ideal: '60-100 bpm' },
                { metric: 'BMI', ideal: '18.5-24.9' }
              ].map((item, index) => (
                <div key={index}>
                  <h4 className="text-accentSky font-semibold">{item.metric}</h4>
                  <p className="text-lightGray/80">{item.ideal}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Take Control of Your Heart Health</h3>
          <p className="text-lightGray/80 mb-8 max-w-2xl mx-auto">
            Our comprehensive assessment tools and personalized recommendations can help 
            you maintain optimal cardiovascular health.
          </p>
          <Link to="/health-checkup">
          <button className=" text-white  px-[1vw] py-[1.5vh] rounded-xl font-bold hover:scale-105 transition-transform
          shadow-[5px_5px_20px_#FF6B6B,-5px_5px_20px_#FF6B6B,5px_-5px_20px_#FF6B6B,-5px_-5px_20px_#FF6B6B]">
          {/* shadow-[5px_5px_20px_#7ED6DF,-5px_5px_20px_#7ED6DF,5px_-5px_20px_#7ED6DF,-5px_-5px_20px_#7ED6DF]"> */}
            Start Heart Health Assessment
          </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
// #FF6B6B
// #7ED6DF
export default HeartDiseasePage;