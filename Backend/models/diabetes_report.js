import mongoose from 'mongoose';

const DiabetesReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
//   type: {
//     type: String,
//     // enum: ['diabetes', 'heart', 'parkinsons', 'health-checkup'],
//     required: true
//   },
  result: {
    prediction: Boolean,
    confidence: Number,
    status: String,
    type: String
  },
  pregnancies: {
    type: Number,
    required: true
  },
  glucose: {
    type: Number,
    required: true
  },
  bloodPressure: {
    type: Number,
    required: true
  },
  skinThickness: {
    type: Number,
    required: true
  },
  insulin: {
    type: Number,
    required: true // Not marked as required since it can be optional
  },
  bmi: {
    type: Number,
    required: true,
    min: 0 // Optional validation to ensure BMI is non-negative
  },
  diabetesPedigreeFunction: {
    type: Number,
    required: true // Not marked as required since it can be optional
  },
  age: {
    type: Number,
    required: true
  },
  recommendations: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DiabetesReport', DiabetesReportSchema);