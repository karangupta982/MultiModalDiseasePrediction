import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../Service/Operation/authAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

function VerifyEmail() {
  const mountRef = useRef(null)
  const [otp, setOtp] = useState("");
  const { signupData, loading,setLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Particle system
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
    //   size: 0.02,
      size: 0.009,
      color: 0x4338ca, // Indigo color to match the theme
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 2

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      // accountType,
      // firstName,
      // lastName,
      // email,
      // password,
      // confirmPassword,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,          // New field for Gender
      dateOfBirth,             // New field for Date of Birth
      disease,         // New field for Disease
      allergies,
      } = signupData;

    dispatch(
      signUp(
        // accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        gender,          // New field for Gender
        dateOfBirth,             // New field for Date of Birth
        disease,         // New field for Disease
        allergies,
        otp,
        navigate
      )
    );
  };

  // if(loading){
  //   return (
  //     <Loader text='loading...' />
  //   )
  // }
// return (
//   
// )


  return (
  
    <div className="min-h-screen relative">
    {/* Background Mount Ref */}
    <div ref={mountRef} className="absolute inset-0 z-0" />
    <div className="relative top-[48vh] left-[48vw]"></div>
    {/* Content Layer */}
    <div className="relative z-10 min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader text='Loading...' speed='1' />
        </div>
      ) : (
        <div className=" max-w-[500px] p-4 lg:p-8  bg-richblack-900/80  shadow-xl  h-full w-full bg-slate-800 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50 border border-gray-100">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 transition-all duration-200"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/signup"
              className="text-richblack-5 flex items-center gap-x-2 hover:text-yellow-50 transition-colors duration-200"
            >
              <BiArrowBack /> Back To Signup
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2 hover:text-blue-200 transition-colors duration-200"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>

    
  </div>
  
  );
}

export default VerifyEmail;


















// <div className="relative min-h-screen">
// <div ref={mountRef} className="absolute inset-0 z-0" />
// <div className="relative z-10 flex items-center justify-center min-h-screen">
//   <div className="  p-8  shadow-xl max-w-md 
// h-full w-full bg-slate-800 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50 border border-gray-100
// ">
//     <h1 className=" font-bold  text-center text-white text-4xl mb-[4vh]">Login</h1>
//     {/* <form onSubmit={handleLogin} className="space-y-4 ">
//       <div>
//         <label htmlFor="username" className="text-zinc-50">
//           Username
//         </label>
//         <input
//           id="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full"
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="password" className="text-gray-700">
//           Password
//         </label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full"
//           required
//         />
//       </div>
//       <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
//         Log In
//       </button>
//     </form> */}

//       <form
//       onSubmit={handleOnSubmit}
//       className="mt-6 flex w-full flex-col gap-y-4"
//       >
//       <label className="w-full">
//           <p className="mb-1 text-xl leading-[1.375rem] text-slate-100">
//           Email Address <sup className="">*</sup>
//           </p>
//           <input
//           required
//           type="text"
//           name="email"
//           value={email}
//           onChange={handleOnChange}
//           placeholder="Enter email address"
//           className="form-style w-full px-[1.5vw] py-[1vh] rounded-full"
//           />
//       </label>
//       <label className="relative">
//           <p className="mb-1 text-xl leading-[1.375rem] text-slate-100">
//           Password <sup className="">*</sup>
//           </p>
//           <input
//           required
//           type={showPassword ? "text" : "password"}
//           name="password"
//           value={password}
//           onChange={handleOnChange}
//           placeholder="Enter Password"
//           className="form-style w-full px-[1.5vw] py-[1vh] rounded-full"
//           />
//           <span
//           onClick={() => setShowPassword((prev) => !prev)}
//           className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//           >
//           {showPassword ? (
//               <AiOutlineEyeInvisible fontSize={24} className="text-slate-900" />
//           ) : (
//               <AiOutlineEye fontSize={24}  className="text-slate-900"/>
//           )}
//           </span>
//           <Link to="/forgot-password">
//           <p className="mt-1 ml-auto max-w-max text-sm text-blue-100">
//               Forgot Password
//           </p>
//           </Link>
//       </label>
//       <button
//           type="submit"
//           className="mt-6  bg-slate-200 text-2xl rounded-full py-[8px] px-[12px] font-medium text-gray-900"
//       >
//           Login
//       </button>
//       </form>
//   </div>
// </div>
// </div>



