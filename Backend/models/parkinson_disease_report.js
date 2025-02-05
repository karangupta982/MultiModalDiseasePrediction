import mongoose from 'mongoose';

const parkinsonsPredictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // type: {
    //     type: String,
    //     // enum: ['diabetes', 'heart', 'parkinsons', 'health-checkup'],
    //     required: true
    // },
    result: {
        prediction: Boolean,
        confidence: Number,
        status: String,
        type: String
    },
    'MDVP:Fo(Hz)': {
        type: Number,
        required: true
    },
    'MDVP:Fhi(Hz)': {
        type: Number,
        required: true
    },
    'MDVP:Flo(Hz)': {
        type: Number,
        required: true
    },
    'MDVP:Jitter(%)': {
        type: Number,
        required: true
    },
    'MDVP:Jitter(Abs)': {
        type: Number,
        required: true
    },
    'MDVP:RAP': {
        type: Number,
        required: true
    },
    'MDVP:PPQ': {
        type: Number,
        required: true
    },
    'Jitter:DDP': {
        type: Number,
        required: true
    },
    'MDVP:Shimmer': {
        type: Number,
        required: true
    },
    'MDVP:Shimmer(dB)': {
        type: Number,
        required: true
    },
    'Shimmer:APQ3': {
        type: Number,
        required: true
    },
    'Shimmer:APQ5': {
        type: Number,
        required: true
    },
    'MDVP:APQ': {
        type: Number,
        required: true
    },
    'Shimmer:DDA': {
        type: Number,
        required: true
    },
    'NHR': {
        type: Number,
        required: true
    },
    'HNR': {
        type: Number,
        required: true
    },
    'RPDE': {
        type: Number,
        required: true
    },
    'DFA': {
        type: Number,
        required: true
    },
    'Spread1': {
        type: Number,
        required: true
    },
    'Spread2': {
        type: Number,
        required: true
    },
    'D2': {
        type: Number,
        required: true
    },
    'PPE': {
        type: Number,
        required: true
    },
    recommendations: [String],
    date: {
      type: Date,
      default: Date.now
    }
});

// Create the model
module.exports =  mongoose.model('ParkinsonsDiseaseReport', parkinsonsPredictionSchema);











