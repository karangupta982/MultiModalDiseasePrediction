import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import predictionRoutes from './routes/predictionRoutes.mjs';
import dotenv from 'dotenv';
import userRoutes from './routes/User.js';
import profileRoutes from './routes/Profile.js'
import cookieParser from 'cookie-parser'
import { cloudinaryConnect } from "./Configuration/Cloudinary.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000'
}));


app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

cloudinaryConnect();



app.use('/api/predict', predictionRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);





// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    status: 'error',
    details: {
      message: err.message,
      type: 'unexpected_error'
    }
  });
});

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
