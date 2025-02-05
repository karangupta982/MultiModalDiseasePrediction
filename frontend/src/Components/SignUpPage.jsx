import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../Service/Operation/authAPI"
import { setSignupData } from "../Slice/authSlice"


export default function SignUpForm() {
  const mountRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
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

 

 

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",          // New field for Gender
    dateOfBirth: "",             // New field for Date of Birth
    disease: "",         // New field for Disease
    allergies: "",       // New field for Allergies
  });

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // const { firstName, lastName, email, password, confirmPassword } = formData
  const { firstName, lastName, email, password, confirmPassword, gender, dateOfBirth, disease, allergies } = formData;
  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
     
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",          // New field for Gender
      dateOfBirth: "",             // New field for Date of Birth
      disease: "",         // New field for Disease
      allergies: "",
    })
    
  }

 

  return (
    <div className="relative min-h-screen">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="  p-8  shadow-xl max-w-[25vw] 
h-full w-full bg-slate-800 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50 border border-gray-100
">
          <h1 className=" font-bold  text-center text-white text-4xl mb-[4vh]">Sign Up</h1>


            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-[2.5vh]">


              <div className="flex gap-x-4 ">
                <label>
                  <p className="mb-2 text-xl leading-[1.375rem] text-slate-200">
                    First Name <sup className="">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChange}
                    placeholder="Enter first name"
                    className="form-style w-full px-[1vw] py-[1vh] rounded-l-full"
                  />
                </label>
                <label>
                  <p className="mb-2 text-xl leading-[1.375rem] text-slate-200">
                    Last Name <sup className="">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleOnChange}
                    placeholder="Enter last name"
                    className="form-style w-full px-[1vw] py-[1vh] rounded-r-full"
                  />
                </label>
              </div>


              <label className="w-full">
                <p className="mb-2 text-xl leading-[1.375rem] text-slate-200">
                  Email Address <sup className="">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="form-style w-full px-[1vw] py-[1vh] rounded-full"
                />
              </label>

             <div className="flex justify-between gap-x-4">
                 {/* Gender Input */}
                <label className="w-full">
                  <p className="mb-2 text-xl leading-[1.375rem] text-slate-200">
                    Gender <sup className="">*</sup>
                  </p>
                  <select
                    required
                    name="gender"
                    value={gender}
                    onChange={handleOnChange}
                    className="form-style w-full px-[1vw] py-[1vh] rounded-l-full"
                  >
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                {/* Date of Birth Input */}
                <label className="w-full">
                  <p className="mb-2 text-xl leading-[1.375rem] text-slate-200">
                    Date of Birth <sup className="">*</sup>
                  </p>
                  <input
                    required
                    type="date"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={handleOnChange}
                    className="form-style w-full px-[1vw] py-[1vh] rounded-r-full"
                  />
                </label>
             </div>

              {/* Disease Input */}
              <label className="w-full">
                <p className="mb-2 text-xl leading-[1.375rem] text-slate-200">
                  Disease <sup className="">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="disease"
                  value={disease}
                  onChange={handleOnChange}
                  placeholder="Enter disease name"
                  className="form-style w-full px-[1vw] py-[1vh] rounded-full"
                />
              </label>


              {/* Allergies Input */}
              <label className="w-full">
                <p className="mb-2 text-xl leading-[1.375rem] text-slate-200">
                  Allergies <sup className="">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="allergies"
                  value={allergies}
                  onChange={handleOnChange}
                  placeholder="Enter any allergies"
                  className="form-style w-full px-[1vw] py-[1vh] rounded-full"
                />
              </label>

              <div className="flex gap-x-4">
                <label className="relative">
                  <p className="mb-2 text-xl leading-[1.375rem] text-slate-200">
                    Create Password <sup className="">*</sup>
                  </p>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="form-style w-full px-[1vw] py-[1vh] rounded-l-full"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} className="text-slate-900" />
                    ) : (
                      <AiOutlineEye fontSize={24} className="text-slate-900" />
                    )}
                  </span>
                </label>
                <label className="relative">
                  <p className="mb-2 text-xl leading-[1.375rem] text-slate-200">
                    Confirm Password <sup className="">*</sup>
                  </p>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                    className="form-style w-full px-[1vw] py-[1vh] rounded-r-full"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} className="text-slate-900" />
                    ) : (
                      <AiOutlineEye fontSize={24} className="text-slate-900" />
                    )}
                  </span>
                </label>
              </div>


              <button
                type="submit"
                className="mt-6 rounded-[8px] text-xl bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
              >
                Create Account
              </button>
            </form> 
        </div>
      </div>
    </div>


    
  )
}

