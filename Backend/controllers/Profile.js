import Profile from "../models/Profile";
import User from "../models/UserModel";
import { uploadImageToCloudinary } from "../Utils/ImageUploader";
import mongoose from "mongoose";





exports.updateProfile = async (req, res) => {
    try {
      const {
        firstName = "",
        lastName = "",
        dateOfBirth = "",
        about = "",
        contactNumber = "",
        gender = "",
      } = req.body;
      const id = req.user.id;
  
      const userDetails = await User.findById(id);
      const profile = await Profile.findById(userDetails.additionalDetails);
  
      const user = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
      });
      await user.save();
  
      profile.dateOfBirth = dateOfBirth;
      profile.about = about;
      profile.contactNumber = contactNumber;
      profile.gender = gender;
  
      await profile.save();
  
      const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec();
  
      return res.json({
        success: true,
        message: "Profile updated successfully",
        updatedUserDetails,
      });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };



  
  exports.deleteAccount = async (req, res) => {
    try {
      const id = req.user.id;
      // console.log(id);
      const user = await User.findById({ _id: id });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      await Profile.findByIdAndDelete({
        _id: new mongoose.Types.ObjectId(user.additionalDetails),
      });
      // for (const courseId of user.courses) {
      //   await Course.findByIdAndUpdate(
      //     courseId,
      //     { $pull: { studentsEnroled: id } },
      //     { new: true }
      //   );
      // }
  
      await User.findByIdAndDelete({ _id: id });
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
      // await CourseProgress.deleteMany({ userId: id });
    } catch (error) {
      // console.log(error);
      res
        .status(500)
        .json({ success: false, message: "User Cannot be deleted successfully" });
    }
  };
  




  exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      );
      // console.log(image);
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      );
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };