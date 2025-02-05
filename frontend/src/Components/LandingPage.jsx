// "use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
//   const mountRef = useRef<HTMLDivElement>(null)
const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Create a DNA helix
    const dnaGeometry = new THREE.BufferGeometry()
    const dnaMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
    // const dnaMaterial = new THREE.LineBasicMaterial({ color: 0x2ECC71 })
    // const dnaMaterial = new THREE.LineBasicMaterial({ color: 0x4338ca })

    const points = []
    for (let i = 0; i < 1000; i++) {
      const t = i * 0.03
      const x = Math.sin(t) * 2
      const y = t * 0.2
      const z = Math.cos(t) * 2
      points.push(new THREE.Vector3(x, y, z))

      // Add connecting lines
      if (i % 20 === 0) {
        points.push(new THREE.Vector3(x, y, z))
        points.push(new THREE.Vector3(-x, y, -z))
      }
    }

    dnaGeometry.setFromPoints(points)
    const dnaHelix = new THREE.Line(dnaGeometry, dnaMaterial)
    scene.add(dnaHelix)

    // Add some floating particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesMaterial = new THREE.PointsMaterial({ color: 0xffffff , size: 0.05 })
    // const particlesMaterial = new THREE.PointsMaterial({ color: 0x2ECC71, size: 0.05 })
    // const particlesMaterial = new THREE.PointsMaterial({ color: 0x4338ca, size: 0.05 })

    const particlesVertices = []
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      particlesVertices.push(x, y, z)
    }

    particlesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(particlesVertices, 3))
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    camera.position.z = 5

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      dnaHelix.rotation.y += 0.005
      particles.rotation.y += 0.001
      controls.update()
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

  return (
    <main className="relative min-h-screen">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white   bg-opacity-50">
         <h1 className="text-8xl font-bold mb-4  text-slate-300">HealthPredict AI</h1>
        {/*<p className="text-xl mb-8 max-w-2xl text-center">
          Advanced multimodal disease prediction using machine learning and AI
        </p> */}
        {/* <div className="space-x-4">
          <Link
            href="/predict"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Start Prediction
          </Link>
          <Link
            href="/about"
            className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-2 px-4 rounded transition duration-300"
          >
            Learn More
          </Link>
        </div> */}
        <TypeAnimation
      className=" h-full text-4xl md:text-5xl lg:text-4xl bg-slate-300 text-transparent bg-clip-text font-bold"
      sequence={[
        'Advanced ML Disease Prediction',
        1000,
        'Precision Heart Disease Analysis',
        1000,
        'Smart Diabetes Risk Assessment',
        1000,
        "Parkinson's Detection AI",
        1000,
        'Intelligent Health Checkup',
        1000,
        'AI Medical Chat Assistant',
        1000,
        'Comprehensive Health Analysis',
        1000
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
      </div>
    </main>
  )
}

