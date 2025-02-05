import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        // single report of diabetes is storing because people will compare from it's previous report
        diabetesReportId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DiabetesReport',
        },
        heartDiseaseReportId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HeartDiseaseReport',
          
        },
        parkinsonDiseaesReportId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ParkinsonsDiseaseReport',
           
        },
        password: {
            type: String,
            required: true,
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Profile",
        },
        token: {
            type: String,
        },
        // for token expiry time if resetPasswordExpires > date.now() then only user can reset password
        resetPasswordExpires: {
            type: Date,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User',UserSchema);