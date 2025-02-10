import mongoose from 'mongoose';

const parkinsonsPredictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    // type: {
    //     type: String,
    //     // enum: ['diabetes', 'heart', 'parkinsons', 'health-checkup'],
    //     required: true
    // },
    // result: {
    //     prediction: Boolean,
    //     confidence: Number,
    //     status: String,
    //     type: String
    // },
    'MDVP_Fo_Hz': {
        type: Number,
        required: true
    },
    'MDVP_Fhi_Hz': {
        type: Number,
        required: true
    },
    'MDVP_Flo_Hz': {
        type: Number,
        required: true
    },
    'MDVP_Jitter_%': {
        type: Number,
        required: true
    },
    'MDVP_Jitter_Abs': {
        type: Number,
        required: true
    },
    'MDVP_RAP': {
        type: Number,
        required: true
    },
    'MDVP_PPQ': {
        type: Number,
        required: true
    },
    'Jitter_DDP': {
        type: Number,
        required: true
    },
    'MDVP_Shimmer': {
        type: Number,
        required: true
    },
    'MDVP_Shimmer_dB': {
        type: Number,
        required: true
    },
    'Shimmer_APQ3': {
        type: Number,
        required: true
    },
    'Shimmer_APQ5': {
        type: Number,
        required: true
    },
    'MDVP_APQ': {
        type: Number,
        required: true
    },
    'Shimmer_DDA': {
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
    lastChecked:{
        type: Date,
        default: Date.now,
    },
    outcome: {
        type: Number,
    },
});

// Create the model
const ParkinsonsDiseaseReport=  mongoose.model('ParkinsonsDiseaseReport', parkinsonsPredictionSchema);
export default ParkinsonsDiseaseReport











