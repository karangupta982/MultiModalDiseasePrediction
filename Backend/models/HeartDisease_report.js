import mongoose from 'mongoose';

const heartDiseasePredictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
//   type: {
//     type: String,
//     // enum: ['diabetes', 'heart', 'parkinsons', 'health-checkup'],
//     required: true
//   },
  // result: {
  //   prediction: Boolean,
  //   confidence: Number,
  //   status: String,
  //   type: String
  // },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    enum: ['0', '1'], // '0' for Female, '1' for Male
    required: true
  },
  chestPainTypes: {
    type: String,
    enum: ['0', '1', '2', '3'], // Different types of chest pain
    required: true
  },
  restingBloodPressure: {
    type: Number,
    required: true
  },
  serumCholestoral: {
    type: Number,
    required: true
  },
  fastingBloodSugar: {
    type: String,
    enum: ['0', '1'], // '0' for No, '1' for Yes
    required: true
  },
  restingECGResults: {
    type: String,
    enum: ['0', '1', '2'], // Different ECG results
    required: true
  },
  maxHeartRate: {
    type: Number,
    required: true
  },
  exerciseInducedAngina: {
    type: String,
    enum: ['0', '1'], // '0' for No, '1' for Yes
    required: true
  },
  stDepressionExercise: {
    type: Number,
    required: true
  },
  slopeOfPeakExerciseSTSegment: {
    type: String,
    enum: ['0', '1', '2'], // Slope types
    required: true
  },
  majorVesselsColoredByFluoroscopy: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  thalStatus: {
    type: String,
    enum: ['0', '1', '2'], // Thalassemia status options
    required: true
  },
  recommendations: [String],
  lastChecked:{
    type: Date,
    default: Date.now,
  },
  outcome: {
    type: Number,
  },
});

const HeartDiseaseReport =  mongoose.model('HeartDiseaseReport', heartDiseasePredictionSchema);
export default HeartDiseaseReport