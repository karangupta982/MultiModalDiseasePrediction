// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const predictionRoutes = require('./routes/predictionRoutes');

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import predictionRoutes from './routes/predictionRoutes.mjs'
// // const dotenv = require('dotenv');
// import dotenv from 'dotenv';
// import axios from 'axios';
// dotenv.config();


// const HUGGING_FACE_API_TOKEN = process.env.HF_TOKEN
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware

// // const cors = require('cors');

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));


// // app.use(cors());
// app.use(express.json());

// // gpt2 : fine


// app.post('/api/predict/medical-chat', async (req, res) => {
//   const prompt = req.body.message;
//   const modelId = 'ContactDoctor/Bio-Medical-3B-CoT-012025'; // Replace with the *actual* model ID

//   if (!HUGGING_FACE_API_TOKEN || HUGGING_FACE_API_TOKEN === 'your_hugging_face_api_token') {
//     return res.status(500).json({ error: 'Hugging Face API token is missing or not configured.' });
//   }


//   try {
//       const response = await axios.post(
//           `https://api-inference.huggingface.co/models/${modelId}`,
//           { inputs: prompt },
//           {
//               headers: {
//                   Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
//               },
//           }
//       );

//       console.log("Hugging Face API Response:", JSON.stringify(response.data, null, 2)); // Important for debugging

//       //  Handle the response data based on the specific model.  This is an example for flan-t5-xl
//       let botResponse;
//       if (typeof response.data === 'string') {
//         botResponse = response.data;
//       } else if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].generated_text) {
//         botResponse = response.data[0].generated_text;
//       } else if (response.data.generated_text) { // some models return the text directly
//           botResponse = response.data.generated_text;
//       }
//        else {
//         botResponse = 'Unexpected response format from Hugging Face API. Check logs.';
//       }

//       res.json({ response: botResponse });

//   } catch (error) {
//       console.error('Error calling Hugging Face API:', error);
//       if (error.response) {
//         console.error('Hugging Face API Response Error:', error.response.data); // Log the error from HF API
//         res.status(error.response.status).json({ error: `Hugging Face API Error: ${error.response.data.error}` || error.message }); // Send HF error to the client
//       } else if (error.request) {
//         console.error('No response received from Hugging Face API:', error.request);
//         res.status(500).json({ error: 'No response received from Hugging Face API' });
//       } else {
//         console.error('Request setup error:', error.message);
//         res.status(500).json({ error: `Request setup error: ${error.message}` });
//       }
//   }
// });

// // Routes
// app.use('/api/predict', predictionRoutes);

// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err))


// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     error: 'Something broke!',
//     details: err.message 
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
























// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import predictionRoutes from './routes/predictionRoutes.mjs';
// import dotenv from 'dotenv';
// import axios from 'axios';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const HUGGING_FACE_API_TOKEN = process.env.HF_TOKEN;
// // // Retry configuration
// const MAX_RETRIES = 3;
// const INITIAL_RETRY_DELAY = 10000; // 10 seconds

// // Helper function to wait
// const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // Helper function to make API call with retries
// async function callHuggingFaceAPI(modelId, prompt, retryCount = 0) {
//   try {
//     const response = await axios.post(
//       `https://api-inference.huggingface.co/models/${modelId}`,
//       { inputs: prompt },
//       {
//         headers: {
//           Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     if (error.response?.data?.error?.includes('loading') && retryCount < MAX_RETRIES) {
//       const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
//       console.log(`Model loading, retrying in ${retryDelay/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
//       await wait(retryDelay);
//       return callHuggingFaceAPI(modelId, prompt, retryCount + 1);
//     }
//     throw error;
//   }
// }



// app.post('/api/predict/medical-chat', async (req, res) => {
//   const prompt = req.body.message;
//   const modelId = 'mistralai/Mistral-Small-24B-Instruct-2501';

//   if (!HUGGING_FACE_API_TOKEN || HUGGING_FACE_API_TOKEN === 'your_hugging_face_api_token') {
//     return res.status(500).json({ 
//       error: 'Hugging Face API token is missing or not configured.',
//       status: 'configuration_error'
//     });
//   }

//   try {
//     const data = await callHuggingFaceAPI(modelId, prompt);
//     console.log("data:",data)
//     // Parse response based on format
//     let botResponse;
//     if (typeof data === 'string') {
//       botResponse = data;
//     } else if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
//       botResponse = data[0].generated_text;
//     } else if (data.generated_text) {
//       botResponse = data.generated_text;
//     } else {
//       throw new Error('Unexpected response format from Hugging Face API');
//     }

//     console.log("botResponse:",botResponse)
//     res.json({ 
//       response: botResponse,
//       status: 'success'
//     });

//   } catch (error) {
//     console.error('Error in medical chat endpoint:', error);
    
//     const errorResponse = {
//       error: 'An error occurred while processing your request',
//       status: 'error',
//       details: {
//         message: error.message,
//         type: error.response?.data?.error || 'unknown'
//       }
//     };

//     // Set appropriate status code based on error type
//     const statusCode = error.response?.status || 500;
//     res.status(statusCode).json(errorResponse);
//   }
// });


// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

// app.use(express.json());



// app.use('/api/predict', predictionRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     error: 'Internal server error',
//     status: 'error',
//     details: {
//       message: err.message,
//       type: 'unexpected_error'
//     }
//   });
// });

// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });















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
