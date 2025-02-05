// import React, { useState } from 'react';
// // import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Activity, Heart, Brain, AlertCircle, CheckCircle } from 'lucide-react';

// const MedicalReports = () => {
//   const [activeTab, setActiveTab] = useState('diabetes');

//   // Example data structure
//   const reports = {
//     diabetes: {
//       lastChecked: "2024-02-04",
//       data: {
//         "Pregnancies": 6,
//         "Glucose": 148,
//         "BloodPressure": 72,
//         "SkinThickness": 35,
//         "Insulin": 0,
//         "BMI": 33.6,
//         "DiabetesPedigreeFunction": 0.627,
//         "Age": 50
//       },
//       outcome: 1,
//       prediction: "High Risk",
//       accuracy: "85%"
//     },
//     heart: {
//       lastChecked: "2024-02-03",
//       data: {
//         "Age": 63,
//         "Sex": "Male",
//         "ChestPainType": "Typical angina",
//         "RestingBP": 145,
//         "Cholesterol": 233,
//         "FastingBS": 1,
//         "RestingECG": "Normal",
//         "MaxHR": 150,
//         "ExerciseAngina": "Yes",
//         "Oldpeak": 2.3,
//         "STSlope": "Downsloping"
//       },
//       outcome: 1,
//       prediction: "High Risk",
//       accuracy: "90%"
//     },
//     parkinson: {
//       lastChecked: "2024-02-02",
//       data: {
//         "MDVP:Fo(Hz)": 119.992,
//         "MDVP:Fhi(Hz)": 157.302,
//         "MDVP:Flo(Hz)": 74.997,
//         "MDVP:Jitter(%)": 0.00784,
//         "MDVP:Jitter(Abs)": 0.00007,
//         "MDVP:RAP": 0.00370,
//         "MDVP:PPQ": 0.00554,
//         "Jitter:DDP": 0.01109
//       },
//       outcome: 0,
//       prediction: "Low Risk",
//       accuracy: "87%"
//     }
//   };

//   const tabs = [
//     { 
//       id: 'diabetes', 
//       label: 'Diabetes Report', 
//       icon: Activity,
//       color: 'from-blue-500 to-cyan-400'
//     },
//     { 
//       id: 'heart', 
//       label: 'Heart Disease Report', 
//       icon: Heart,
//       color: 'from-red-500 to-pink-400'
//     },
//     { 
//       id: 'parkinson', 
//       label: 'Parkinson Report', 
//       icon: Brain,
//       color: 'from-purple-500 to-indigo-400'
//     }
//   ];

//   const renderFormData = (data) => {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//         {Object.entries(data).map(([key, value]) => (
//           <div key={key} className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-500">{key}</p>
//             <p className="text-lg font-semibold text-gray-900">
//               {typeof value === 'number' ? value.toFixed(3) : value}
//             </p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderReport = (reportData) => {
//     if (!reportData) return <p>No report available</p>;

//     return (
//       <div className="space-y-6">
//         {/* Report Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Last Checked</p>
//             <p className="text-lg font-semibold">
//               {new Date(reportData.lastChecked).toLocaleDateString()}
//             </p>
//           </div>
//           <div className="flex items-center gap-6">
//             <div>
//               <p className="text-sm text-gray-500">Prediction Accuracy</p>
//               <p className="text-lg font-semibold">{reportData.accuracy}</p>
//             </div>
//             <div className="flex items-center gap-2">
//               {reportData.outcome === 1 ? (
//                 <AlertCircle className="w-6 h-6 text-red-500" />
//               ) : (
//                 <CheckCircle className="w-6 h-6 text-green-500" />
//               )}
//               <span className={`text-lg font-semibold ${
//                 reportData.outcome === 1 ? 'text-red-500' : 'text-green-500'
//               }`}>
//                 {reportData.prediction}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Report Data */}
//         <div>
//           <div>
//             <div className="text-lg font-semibold">Test Results</div>
//           </div>
//           <div>
//             {renderFormData(reportData.data)}
//           </div>
//         </div>

//         {/* Recommendations */}
//         <div>
//           <div>
//             <div className="text-lg font-semibold">Recommendations</div>
//           </div>
//           <div>
//             <div className="space-y-2">
//               {reportData.outcome === 1 ? (
//                 <>
//                   <p className="text-red-600">• Immediate consultation with a healthcare provider is recommended</p>
//                   <p className="text-gray-600">• Regular monitoring of vital signs</p>
//                   <p className="text-gray-600">• Follow-up tests may be required</p>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-green-600">• Your results are within normal range</p>
//                   <p className="text-gray-600">• Continue maintaining your healthy lifestyle</p>
//                   <p className="text-gray-600">• Schedule next check-up in 6 months</p>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Report Type Tabs */}
//       <div className="flex flex-wrap gap-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
//               activeTab === tab.id 
//                 ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
//                 : 'bg-white text-gray-600 hover:bg-gray-50'
//             }`}
//           >
//             <tab.icon className="w-5 h-5" />
//             <span>{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Active Report Display */}
//       {renderReport(reports[activeTab])}
//     </div>
//   );
// };

// export default MedicalReports;































import { useState } from "react"
import { Activity, Heart, Brain, AlertCircle, CheckCircle, Calendar } from "lucide-react"

const reports = {
  diabetes: {
    lastChecked: "2024-03-08T12:00:00",
    accuracy: "95%",
    outcome: 0,
    prediction: "Normal",
    data: {
      "Fasting Blood Sugar": 90,
      HbA1c: 5.5,
      Insulin: 10,
    },
  },
  heart: {
    lastChecked: "2024-03-08T12:00:00",
    accuracy: "92%",
    outcome: 1,
    prediction: "High Risk",
    data: {
      "Blood Pressure": 140,
      Cholesterol: 220,
      "Heart Rate": 80,
    },
  },
  parkinson: {
    lastChecked: "2024-03-08T12:00:00",
    accuracy: "88%",
    outcome: 0,
    prediction: "Normal",
    data: {
      Tremors: 0,
      Rigidity: 1,
      Bradykinesia: 2,
    },
  },
}

const MedicalReports = () => {
  const [activeTab, setActiveTab] = useState("diabetes")

  // Your existing reports data...

  const tabs = [
    {
      id: "diabetes",
      label: "Diabetes Report",
      icon: Activity,
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      id: "heart",
      label: "Heart Disease Report",
      icon: Heart,
      gradient: "from-red-500 to-pink-400",
    },
    {
      id: "parkinson",
      label: "Parkinson Report",
      icon: Brain,
      gradient: "from-purple-500 to-indigo-400",
    },
  ]

  const renderFormData = (data) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="relative group overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-4">
              <p className="text-sm text-gray-400">{key}</p>
              <p className="text-lg font-semibold text-white">{typeof value === "number" ? value.toFixed(3) : value}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-8">
      {/* Glass card container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

        {/* Content */}
        <div className="relative space-y-8">
          {/* Enhanced Tab Navigation */}
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative overflow-hidden rounded-xl px-6 py-3 transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.gradient} shadow-lg shadow-${tab.gradient.split("-")[1]}/25`
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <div className="relative flex items-center gap-2">
                  <tab.icon
                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                      activeTab === tab.id ? "text-white" : "text-gray-400"
                    }`}
                  />
                  <span className={activeTab === tab.id ? "text-white font-medium" : "text-gray-400"}>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Report Content with Enhanced Styling */}
          <div className="space-y-8 text-white">
            {/* Report Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div>
                <p className="text-gray-400">Last Checked</p>
                <p className="text-xl font-semibold">{new Date(reports[activeTab].lastChecked).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-gray-400">Prediction Accuracy</p>
                  <p className="text-xl font-semibold">{reports[activeTab].accuracy}</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5">
                  {reports[activeTab].outcome === 1 ? (
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                  <span
                    className={`text-lg font-semibold ${
                      reports[activeTab].outcome === 1 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {reports[activeTab].prediction}
                  </span>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Test Results</h3>
              {renderFormData(reports[activeTab].data)}
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Recommendations</h3>
              <div className="space-y-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm">
                {reports[activeTab].outcome === 1 ? (
                  <>
                    <p className="flex items-center gap-2 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      Immediate consultation with a healthcare provider is recommended
                    </p>
                    <p className="flex items-center gap-2 text-gray-400">
                      <Activity className="w-5 h-5" />
                      Regular monitoring of vital signs
                    </p>
                    <p className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-5 h-5" />
                      Follow-up tests may be required
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      Your results are within normal range
                    </p>
                    <p className="flex items-center gap-2 text-gray-400">
                      <Activity className="w-5 h-5" />
                      Continue maintaining your healthy lifestyle
                    </p>
                    <p className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-5 h-5" />
                      Schedule next check-up in 6 months
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicalReports

