
# 🌿 **Predict Care AI**  
### 🏥 **Revolutionizing Healthcare with AI-Driven Multimodal Disease Prediction**  

**Predict Care AI** is a powerful, full-stack MERN application leveraging machine learning to provide advanced healthcare insights. It features multiple disease prediction models, a medical chatbot, and an AI-powered health checkup system—empowering users to monitor their health with precision and ease.  

🚀 **Live Demo:** [Frontend](https://predictcareai.vercel.app/) | [Backend](https://predictcareai.onrender.com/api)  

---

## 🚨 **Key Features**  

### 🔬 **1. Multimodal Disease Prediction**  
- **Heart Disease Prediction:** Analyze key health metrics to assess heart health.  
- **Diabetes Prediction:** Early detection based on user-provided parameters.  
- **Parkinson's Disease Prediction:** Detect early signs through advanced ML models.  
*All models were trained using Google Colab, and the final trained models are integrated into the application for real-time predictions.*  

### 🩺 **2. AI-Powered Medical Chatbot**  
- Offering real-time health guidance.  

### 📊 **3. AI Medical Health Checkup**  
- Users answer a series of health-related questions, and the system generates an **AI-powered health status report**.  

### 🔐 **4. Secure Authentication & User Dashboard**  
- **JWT-based Authentication** for secure user sessions.  
- **Email Verification** and **Forgot Password** functionality.  
- Users can **upload medical reports** (via **Cloudinary**) and manage their health records.  
- **Health Dashboard:** Users can view and track their previous reports and health checkup history.  

---

## 🚀 **Getting Started**  

### 🛠️ **1. Clone the Project:**  
```bash
git clone https://github.com/karangupta982/MultiModalDiseasePrediction.git  
cd PredictCareAI  
```

### 📦 **2. Install Dependencies:**  
```bash
# Frontend  
cd frontend  
npm install  

# Backend  
cd backend  
npm install  
```

### 🔑 **3. Environment Setup:**  
Create a `.env` file for both frontend and backend with the following variables:  
```ini
# Backend  
MONGO_URI=your-mongodb-uri  
JWT_SECRET=your-jwt-secret  
CLOUDINARY_API_KEY=your-api-key  
CLOUDINARY_SECRET=your-api-secret 
MAIL_HOST =mail_host
MAIL_USER =mail_user
MAIL_PASS = mail_pass
JWT_SECRET=jwt_secret   

# Frontend  
REACT_APP_API_URL=https://your-backend-url.com  
```

### 🚀 **4. Run the Application:**  
```bash
# Backend  
cd backend  
npm start  

# Frontend  
cd frontend  
npm start  
```

---

## 📊 **System Architecture**  

1. **User Interface:** Built with React and TailwindCSS for a clean and responsive UI.  
2. **API Layer:** Node.js and Express for handling user requests and model predictions.  
3. **ML Models:** Heart, Diabetes, and Parkinson’s predictions using detailed analysed model.  
4. **Database:** MongoDB stores user data, reports, and health records.  
5. **Authentication:** JWT-based token system with email verification and password reset.  
6. **Health Dashboard:** Users can view and track past health reports and predictions.  

---

## 🌐 **Live Deployment**  

- **Frontend:** Vercel → [Live Demo](https://predictcareai.vercel.app/)  
- **Backend:** Render → [API Docs](https://predictcareai.onrender.com/api)  

---

## 🤝 **Contributing**  
Contributions are welcome! Feel free to submit a PR or open an issue.  

---

## 🏆 **Why Predict Care AI?**  
✅ 3 Disease Prediction Models  
✅ AI-Powered Health Checkup  
✅ Medical Chatbot  
✅ Secure, Scalable, and Fast  
✅ User Dashboard for Health Tracking  

---

💡 **Transforming healthcare through AI-driven insights—because your health matters.**  

---
