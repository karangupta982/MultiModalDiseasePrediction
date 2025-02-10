import './App.css';
import { useEffect } from 'react';
import HeartDiseasePrediction from './Components/Heart_disease_prediction';
import DiabetesPrediction from './Components/Diabetes_disease_prediction';
import ParkinsonsPrediction from './Components/Parkinsons_disease_prediction';
import ChatComponent from './Components/ChatComponent';
import HealthAssessmentChat from './Components/HealthCheckUp';
import { getUserDetails } from './Service/Operation/profileAPI.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import HomePage from './Pages/HomePage.jsx';
import OpenRoute from './Components/core/OpenRoute.jsx';
import PrivateRoute from './Components/core/PrivateRoute.jsx';
import { Route,Routes } from 'react-router-dom';

// import LandingPage from './Components/LandingPage';
import Error from './Pages/Error.jsx'
import Navbar from './Components/Navbar.jsx';
import Login from './Components/LoginPage';
import SignUpForm  from './Components/SignUpPage';
import VerifyEmail from './Pages/VerifyEmail';
import MyProfile from './Components/Dashboard/MyProfile';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import UpdatePassword from './Pages/UpdatePassword.jsx';
import Home from './Pages/Home.jsx';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
// import DiabetesPrediction from './Components/Diabetes_disease_prediction';
import DiseasePrediction from './Components/DiseasePrediction.jsx';
import { Progressbar } from './Components/Progressbar.jsx';
// import Loader from './Components/Loader.jsx';





function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)
  console.log("USer from app.js",user)
 




  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }

  },[])
  
  const targetRef = useRef(null);
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richBlack text-white font-inter " >
        
        {/* <div className='h-screen w-screen flex justify-center items-center' > */}
        {/* <Loader /> */}
        {/* </div> */}
     
      <div >
      <div ref={targetRef}>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources  />} />
          <Route path="/resources/:field/:id" element={<FieldPage />} />
          <Route path="/resources/essentials/:field/:id" element={<Essentials />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route path="catalog/:catalogName" element={<Catalog />} /> */}

          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            // path="update-password/:id"    // want to make it reset-password/:id
            path="/update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <SignUpForm />
              </OpenRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/heart-disease"
            element={
              <PrivateRoute>
                <HeartDiseasePrediction />
              </PrivateRoute>
            }
          />

          <Route
            path="/diabetes"
            element={
              <PrivateRoute>
                <DiabetesPrediction />
              </PrivateRoute>
            }
          />

          <Route
            path="/parkinsons"
            element={
              <PrivateRoute>
                <ParkinsonsPrediction/>
              </PrivateRoute>
            }
          />

          <Route
            path="/health-checkup"
            element={
              <PrivateRoute>
                <HealthAssessmentChat/>
              </PrivateRoute>
            }
          />


          
          <Route
            path="/predict"
            element={
              <PrivateRoute>
                <DiseasePrediction/>
              </PrivateRoute>
            }
          />

            {/* <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/Settings" element={<Settings />} /> */}
            {/* {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />
              </>
            )} */}
            {/* {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )}
            <Route path="dashboard/settings" element={<Settings />} />
          </Route> */}

            

          <Route path="*" element={<Error />} />
        </Routes>

      </div>


      <Progressbar target={targetRef} />
     
    </div>

  </div>
  );
}

export default App;
