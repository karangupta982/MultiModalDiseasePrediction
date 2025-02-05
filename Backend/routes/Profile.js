import express from "express";
const router = express.Router();
import { auth } from "../Middleware/Auth";
import {
  deleteAccount,
  updateProfile,
//   getAllUserDetails,
  updateDisplayPicture,
//   getEnrolledCourses,
//   instructorDashboard,
} from "../controllers/Profile";

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
// router.get("/getUserDetails", auth, getAllUserDetails);
// router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
