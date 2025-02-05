import bcrypt from "bcryptjs";
import User from "../models/UserModel";
import OTP from "../models/OTP";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import mailSender from "../Utils/MailSender";
import Profile from "../models/Profile";
import dotenv from "dotenv";




dotenv.config();

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      // accountType,
      // contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
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
    
// This method sorts the results of the query. The argument { createdAt: -1 } specifies that the 
// results should be sorted in descending order based on the createdAt field. This means the most 
// recently created documents will come first.
// .limit(1):
// The limit(1) method restricts the number of documents returned by the query to just one. This is
//  useful when you only want the latest entry (in this case, the most recent OTP associated with the
//  specified email).

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
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      // contactNumber,
      password: hashedPassword,
      // accountType: accountType,
      // approved: approved,
      additionalDetails: profileDetails._id,
      image: "",
    });

    return res.status(200).json({
      success: true,
      user,
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");

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

      //jab bhi koi user login karta h then server creates a jwt token and give this 
// token to client as a response and says to client that jab bhi koi request maroge 
// isi token ki info ke sath maarna authenticity proof ho jayegi

// cookie is stored in client side and session is stored in server side
// cookie hyjacking , token hyjecking

// cookie is jjust used to identify user ,it stores session id ,last page pe kys kys click
// kiya ,konsa product visit kiya and kis kis cheeg pe store karne ke liye code kiya h 
// wo sab store ho jata h, and ye cookie browser me store ho jati h, size of cookie 
//is 4kb, session server pe banta and session id only cookie me store ho jati h, sare pages jo run kar
// rhe h wo sare pages stateless h unpages ke beech me state maintain ke liye session ka use karte h

// session storage me jab tak browser open h tab tak


// while both cookies and tokens can be used for authentication, cookies offer several advantages 
// in terms of security, ease of use, and automatic handling by browsers. They are particularly 
// beneficial in traditional web applications that require stateful sessions. Sending tokens in the
//  body can be useful in certain scenarios, such as APIs where stateless authentication is preferred,
//  but it requires more careful handling to ensure security.


// cookie(cookie name, data of cookie, options like validity)
  // here passing token as a cookie

  // here we can get token via req.cookies.token


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

exports.sendotp = async (req, res) => {
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

exports.changePassword = async (req, res) => {
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
