import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import OTP from "../models/OTP.js";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import mailSender from "../Utils/MailSender.js";
// import Profile from "../models/Profile.js";
import dotenv from "dotenv";
import DiabetesReport from "../models/diabetes_report.js";
import HeartDiseaseReport from '../models/HeartDisease_report.js'
import ParkinsonsDiseaseReport from '../models/parkinson_disease_report.js'




dotenv.config();

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,          
      dateOfBirth,             
      disease,         
      allergies,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !gender ||
      !dateOfBirth ||
      !disease ||
      !allergies
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
 

    console.log(response);
    if (!response.length) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // let approved = "";
    // approved === "Instructor" ? (approved = false) : (approved = true);

    // console.log("approaved :", approved);
    const diabetesDetails = await DiabetesReport.create({
      pregnancies: 0,
      glucose: 0,
      bloodPressure: 0,
      skinThickness: 0,
      insulin: 0,
      bmi: 0,
      diabetesPedigreeFunction: 0,
      age: 0,
      lastChecked:Date.now(),
      outcome: -1,
    })

    const heartDiseaseDetails = await HeartDiseaseReport.create({
      age:0,
      sex: 0,
      chestPainTypes: 0,
      restingBloodPressure: 0,
      serumCholestoral: 0,
      fastingBloodSugar: 0,
      restingECGResults: 0,
      maxHeartRate: 0,
      exerciseInducedAngina: 0,
      stDepressionExercise: 0,

      slopeOfPeakExerciseSTSegment: 0,
      majorVesselsColoredByFluoroscopy: 0,
      thalStatus: 0,
      lastChecked:Date.now(),
      outcome:-1,

    });

    const parkinsonDiseaseReport = await ParkinsonsDiseaseReport.create({
      'MDVP_Fo_Hz': 0,
      'MDVP_Fhi_Hz': 0,
      'MDVP_Flo_Hz': 0,
      'MDVP_Jitter_%': 0,
      'MDVP_Jitter_Abs': 0,
      'MDVP_RAP': 0,
      'MDVP_PPQ': 0,
      'Jitter_DDP': 0,
      'MDVP_Shimmer': 0,
      'MDVP_Shimmer_dB': 0,
      'Shimmer_APQ3': 0,
      'Shimmer_APQ5': 0,
      'MDVP_APQ': 0,
      'Shimmer_DDA': 0,
      'NHR': 0,
      'HNR': 0,
      'RPDE': 0,
      'DFA': 0,
      'Spread1': 0,
      'Spread2': 0,
      'D2': 0,
      'PPE': 0,
      lastChecked:Date.now(),
      outcome:-1,

    })
    // const profileDetails = await Profile.create({
    //   gender: null,
    //   dateOfBirth: null,
    //   about: null,
    //   contactNumber: null,
    // });
    const user = await User.create({
      firstName,
      lastName,
      email,
      // contactNumber,
      password: hashedPassword,
      diabetesReportId:diabetesDetails._id,
      heartDiseaseReportId:heartDiseaseDetails._id,
      parkinsonDiseaseReportId:parkinsonDiseaseReport._id,

      // accountType: accountType,
      // approved: approved,
      // additionalDetails: profileDetails._id,
      image: "",
      gender,          
      dateOfBirth,             
      disease,         
      allergies,
    });
    
    const newUser = await User.findById(user._id)
  .populate("diabetesReportId")
  .populate("heartDiseaseReportId")
  .populate("parkinsonDiseaseReportId")
  .exec();
    return res.status(200).json({
      success: true,
      user : newUser,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

// export default signup

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const user = await User.findOne({ email }).populate("diabetesReportId")
    .populate("heartDiseaseReportId")
    .populate("parkinsonDiseaseReportId")
    .exec();
    // const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

// export default login

export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;
      // console.log("email extracted from req.body",email)
      const checkUserPresent = await User.findOne({ email });
      // console.log("email checked from database")

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    console.log("Result in Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    // console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
// export default sendotp

export const changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);

    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        // passwordUpdated(
          // updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        
      );
      // console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

// export default changePassword


