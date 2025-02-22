

import { useState } from "react"
import { Activity, Heart, Brain, AlertCircle, CheckCircle, Calendar } from "lucide-react"
import { useSelector } from "react-redux"


const MedicalReports = () => {
  const [activeTab, setActiveTab] = useState("diabetes")
  const { user } = useSelector((state) => state.profile)
  // console.log("user:",user)

  // Your existing reports data...
  
// "2024-03-08T12:00:00"
  const reports = {
    diabetes: {
      lastChecked: user.diabetesReportId ? (user.diabetesReportId['outcome'] === -1 ? -1: user.diabetesReportId['lastChecked']) : -1,  
      accuracy:"89%",
      outcome:user.diabetesReportId ? user.diabetesReportId['outcome'] : -1,
      prediction: user.diabetesReportId['outcome'] === 1 ? "High Risk":"Normal",
      data: {
        pregnancies: user.diabetesReportId ? user.diabetesReportId['pregnancies'] : -1,
        glucose:user.diabetesReportId['glucose'],
        bloodPressure:user.diabetesReportId['bloodPressure'],
        skinThickness:user.diabetesReportId['skinThickness'],
        insulin:user.diabetesReportId['insulin'],
        bmi:user.diabetesReportId['bmi'],
        diabetesPedigreeFunction:user.diabetesReportId['diabetesPedigreeFunction'] ,
        age:user.diabetesReportId['age'] 
      },
    },
  
    heart: {
      lastChecked:user.heartDiseaseReportId ? (user.heartDiseaseReportId['outcome'] === -1 ? -1: user.heartDiseaseReportId['lastChecked']) : -1,
      // lastChecked:user.heartDiseaseReportId ? user.heartDiseaseReportId['lastChecked'] : -1 ,
      accuracy:"91%",
      outcome:user.heartDiseaseReportId ? user.heartDiseaseReportId['outcome'] : -1,
      prediction: user.heartDiseaseReportId['outcome'] ===1 ? "High Risk":"Normal",
      data: {
        age: user.heartDiseaseReportId ? user.heartDiseaseReportId['age'] : -1 ,
        sex:user.heartDiseaseReportId['sex'] ,
        chestPainTypes:user.heartDiseaseReportId['chestPainTypes'] ,
        skinThickness:user.heartDiseaseReportId['skinThickness'] ,
        restingBloodPressure:user.heartDiseaseReportId['restingBloodPressure'] ,
        serumCholestoral:user.heartDiseaseReportId['serumCholestoral'] ,
        fastingBloodSugar:user.heartDiseaseReportId['fastingBloodSugar'] ,
        restingECGResults:user.heartDiseaseReportId['restingECGResults'] ,
        maxHeartRate: user.heartDiseaseReportId['maxHeartRate'] ,
        exerciseInducedAngina:user.heartDiseaseReportId['exerciseInducedAngina'] ,
        stDepressionExercise:user.heartDiseaseReportId['stDepressionExercise'] ,
        slopeOfPeakExerciseSTSegment:user.heartDiseaseReportId['slopeOfPeakExerciseSTSegment'] ,
        majorVesselsColoredByFluoroscopy:user.heartDiseaseReportId['majorVesselsColoredByFluoroscopy'] ,
        thalStatus:user.heartDiseaseReportId['thalStatus'] ,
      },
    },
    parkinson: {
      lastChecked:user.parkinsonDiseaseReportId ? (user.parkinsonDiseaseReportId['outcome'] === -1 ? -1: user.parkinsonDiseaseReportId['lastChecked']) : -1,
      // lastChecked:user.parkinsonDiseaseReportId ? user.parkinsonDiseaseReportId['lastChecked'] : -1,
      accuracy: "87%",
      outcome:user.parkinsonDiseaseReportId ? user.parkinsonDiseaseReportId['outcome'] : -1,
      prediction: user.parkinsonDiseaseReportId['outcome'] === 1 ? "High Risk":"Normal",
      data: {
        'MDVP_Fo_Hz': user.parkinsonDiseaseReportId ? user.parkinsonDiseaseReportId['MDVP_Fo_Hz'] : -1,
        'MDVP_Fhi_Hz': user.parkinsonDiseaseReportId['MDVP_Fhi_Hz'],
        'MDVP_Flo_Hz': user.parkinsonDiseaseReportId['MDVP_Flo_Hz'] ,
        'MDVP_Jitter_%': user.parkinsonDiseaseReportId['MDVP_Jitter_%'] ,
        'MDVP_Jitter_Abs': user.parkinsonDiseaseReportId['MDVP_Jitter_Abs'] ,
        'MDVP_RAP': user.parkinsonDiseaseReportId['MDVP_RAP'] ,
        'MDVP_PPQ': user.parkinsonDiseaseReportId['MDVP_PPQ'] ,
        'Jitter_DDP': user.parkinsonDiseaseReportId['Jitter_DDP'] ,
        'MDVP_Shimmer': user.parkinsonDiseaseReportId['MDVP_Shimmer'] ,
        'MDVP_Shimmer_dB': user.parkinsonDiseaseReportId['MDVP_Shimmer_dB'] ,
        'Shimmer_APQ3': user.parkinsonDiseaseReportId['Shimmer_APQ3'] ,
        'Shimmer_APQ5': user.parkinsonDiseaseReportId['Shimmer_APQ5'] ,
        'MDVP_APQ': user.parkinsonDiseaseReportId['MDVP_APQ'] ,
        'Shimmer_DDA': user.parkinsonDiseaseReportId['Shimmer_DDA'] ,
        'NHR': user.parkinsonDiseaseReportId['NHR'] ,
        'HNR': user.parkinsonDiseaseReportId['HNR'] ,
        'RPDE': user.parkinsonDiseaseReportId['RPDE'] ,
        'DFA': user.parkinsonDiseaseReportId['DFA'] ,
        'Spread1': user.parkinsonDiseaseReportId['Spread1'] ,
        'Spread2': user.parkinsonDiseaseReportId['Spread2'] ,
        'D2': user.parkinsonDiseaseReportId['D2'] ,
        'PPE': user.parkinsonDiseaseReportId['PPE'] ,
      },
    },
  }


  
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
          {
            reports[activeTab].lastChecked !== -1 ? 
                (
                  <div className="space-y-8 text-white">
                {/* Report Header */}

                {
                  (reports[activeTab].lastChecked !== -1) ? (
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
                  ) : (
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm">
                        No Previous Report Available
                      </div>
                  )
                }
                

                {/* Test Results */}
                {
                  (reports[activeTab].data['pregnancies'] !== -1) || (reports[activeTab].data['MDVP_Fo_Hz'] !== -1) || (reports[activeTab].data['age'] !== -1)   ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Test Results</h3>
                      {renderFormData(reports[activeTab].data)}
                    </div>
                  ) : (
                    <div className="space-y-4"></div>
                  )
                }
                

                {/* Recommendations */}
                {
                  reports[activeTab].outcome !== -1 ? (
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
                  ) : (
                    <div className="space-y-4"></div>
                  )
                }
                
              </div>
                ) : 
            (
              <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm">
                No Previous Report Available
              </div>
            )
          }
          
        </div>
      </div>
    </div>
  )
}

export default MedicalReports

