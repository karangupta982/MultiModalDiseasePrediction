import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../Service/Operation/authAPI"

export default function LoginForm() {
  const mountRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

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

  // const handleLogin = (e) => {
  //   e.preventDefault()
  //   // Handle login logic here
  //   console.log("Login attempted with:", { username, password })
  // }

  return (
    <div className="relative min-h-screen">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="  p-8  shadow-xl max-w-md h-full w-full bg-slate-800 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50 border border-gray-100">
          <h1 className=" font-bold  text-center text-white text-4xl mb-[4vh]">Login</h1>
          {/* <form onSubmit={handleLogin} className="space-y-4 ">
            <div>
              <label htmlFor="username" className="text-zinc-50">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Log In
            </button>
          </form> */}

            <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex w-full flex-col gap-y-4"
            >
            <label className="w-full">
                <p className="mb-1 text-xl leading-[1.375rem] text-slate-100">
                Email Address <sup className="">*</sup>
                </p>
                <input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                className="form-style w-full px-[1.5vw] py-[1vh] rounded-full text-black font-[600]"
                />
            </label>
            <label className="relative">
                <p className="mb-1 text-xl leading-[1.375rem] text-slate-100">
                Password <sup className="">*</sup>
                </p>
                <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full px-[1.5vw] py-[1vh] rounded-full text-black font-[600]"
                style={{ '-ms-reveal': 'none' }}
                
                />
                <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} className="text-slate-900" />
                ) : (
                    <AiOutlineEye fontSize={24}  className="text-slate-900"/>
                )}
                </span>
                <Link to="/forgot-password">
                <p className="mt-1 ml-auto max-w-max text-sm text-blue-100">
                    Forgot Password
                </p>
                </Link>
            </label>
            <button
                type="submit"
                className="mt-6  bg-slate-200 text-2xl rounded-full py-[8px] px-[12px] font-medium text-gray-900"
            >
                Login
            </button>
            </form>
        </div>
      </div>
    </div>


    
  )
}

