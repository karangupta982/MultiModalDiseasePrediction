const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const predictionRoutes = require('./routes/predictionRoutes');

const dotenv = require('dotenv');


// Load environment variables
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

// const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));

// app.use(cors());
app.use(express.json());

// Routes
app.use('/api/predict', predictionRoutes);
// app.use('/api/predict', heartDiseaseRoutes);

// MongoDB Connection (if using database)
// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))




// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});