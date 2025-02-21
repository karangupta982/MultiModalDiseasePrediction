// ParkinsonDiseasePage.jsx
import { motion } from 'framer-motion';
import parkinson from '../assets/parkinson.jpg'
import { Link } from 'react-router-dom';

// const themeColors = {
//   richBlack: '#010B13',
//   accentPurple: '#9333EA',
//   accentTeal: '#2DD4BF',
//   lightGray: '#F3F4F6'
// };

const ParkinsonDiseasePage = () => {
  return (
    <div className="min-h-screen bg-richBlack text-lightGray">
     

      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-richBlack/90 to-richBlack/50 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-accentPurple to-accentTeal bg-clip-text text-transparent">
              Parkinson's Disease Insights
            </h1>
            <p className="text-xl text-lightGray/80 mb-8">
              Advanced analysis and management strategies for Parkinson's disease
            </p>
            <Link to="/predict">
              <button 
              className="bg-accentPurple rounded-xl text-richBlack px-8 py-3  font-semibold hover:bg-accentTeal transition-all transform hover:scale-105">
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
            <div className="absolute -inset-2 bg-accentPurple/20 rounded-3xl transform group-hover:scale-105 transition-all" />
            <img 
              src={parkinson}
              alt="Parkinson's Disease Brain"
              className="rounded-2xl transform transition-all group-hover:scale-101"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold mb-6">Understanding Parkinson's Disease</h2>
            <p className="text-lightGray/80 leading-relaxed mb-6">
              Parkinson's disease is a progressive nervous system disorder that affects movement. 
              Our platform provides comprehensive analysis of symptoms, progression tracking, 
              and personalized management strategies.
            </p>
            <div className="space-y-4">
              {['Tremors', 'Bradykinesia', 'Muscle Rigidity', 'Postural Instability'].map((symptom) => (
                <div key={symptom} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accentPurple rounded-full" />
                  <span className="font-medium">{symptom}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Symptoms Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-richBlack/80 border border-accentPurple/20 rounded-2xl p-8 mb-20"
        >
          <h3 className="text-2xl font-bold mb-8">Key Symptoms</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Tremors', icon: '🤲', description: 'Shaking in hands or fingers' },
              { title: 'Slow Movement', icon: '🐢', description: 'Difficulty initiating movement' },
              { title: 'Rigid Muscles', icon: '💪', description: 'Stiffness in limbs or trunk' },
              { title: 'Impaired Balance', icon: '⚖️', description: 'Difficulty maintaining posture' },
              { title: 'Speech Changes', icon: '🗣️', description: 'Soft or slurred speech' },
              { title: 'Writing Changes', icon: '✍️', description: 'Small, cramped handwriting' }
            ].map((symptom, index) => (
              <div 
                key={index}
                className="p-6 bg-richBlack/50 border border-accentPurple/10 rounded-xl hover:border-accentPurple/30 transition-all"
              >
                <div className="text-3xl mb-3">{symptom.icon}</div>
                <h4 className="text-accentPurple font-semibold mb-2">{symptom.title}</h4>
                <p className="text-lightGray/80">{symptom.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Management Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl font-bold mb-6">Management Strategies</h3>
            <div className="space-y-4">
              {[
                'Medication management (Levodopa, Dopamine agonists)',
                'Physical therapy and exercise programs',
                'Speech and language therapy',
                'Occupational therapy for daily activities',
                'Deep brain stimulation (DBS)',
                'Nutrition and lifestyle modifications'
              ].map((strategy, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accentTeal rounded-full mt-2" />
                  <span className="text-lightGray/80">{strategy}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-richBlack/80 border border-accentTeal/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Progression Tracking</h3>
            <div className="space-y-6">
              {[
                { metric: 'Motor Symptoms', tool: 'UPDRS Scale' },
                { metric: 'Cognitive Function', tool: 'MMSE Test' },
                { metric: 'Daily Activities', tool: 'Schwab & England Scale' },
                { metric: 'Quality of Life', tool: 'PDQ-39 Questionnaire' }
              ].map((item, index) => (
                <div key={index}>
                  <h4 className="text-accentTeal font-semibold">{item.metric}</h4>
                  <p className="text-lightGray/80">{item.tool}</p>
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
          <h3 className="text-2xl font-bold mb-6">Take Control of Parkinson's Management</h3>
          <p className="text-lightGray/80 mb-8 max-w-2xl mx-auto">
            Our comprehensive tools and personalized recommendations can help manage 
            Parkinson's symptoms and improve quality of life.
          </p>
          <Link to="/predict">
          <button className=" text-white px-[1vw] py-[1.5vh] rounded-xl font-bold hover:scale-105 transition-transform
            shadow-[5px_5px_20px_#2DD4BF,-5px_5px_20px_#2DD4BF,5px_-5px_20px_#2DD4BF,-5px_-5px_20px_#2DD4BF]
          ">
            Start Parkinson's Assessment
          </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ParkinsonDiseasePage;