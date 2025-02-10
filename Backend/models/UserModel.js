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
        parkinsonDiseaseReportId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ParkinsonsDiseaseReport',
           
        },
        password: {
            type: String,
            required: true,
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
        gender:{
            type:String
        },          
        dateOfBirth:{
            type:Date,
        },             
        disease:{
            type:String
        },         
        allergies:{
            type:String
        },
        
    },
    { timestamps: true }
)

const User = mongoose.model('User',UserSchema);
export default User












