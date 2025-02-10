import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.webp'
import { FaBars, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Service/Operation/authAPI';

export default function Navbar() {
  const {token} = useSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [currTab,setCurrTab] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Extract the last segment of the path
    const pathSegments = location.pathname.split('/');
    const tab = pathSegments[pathSegments.length - 1];
    setCurrTab(tab);
  }, [location.pathname]); // Only run when location.pathname changes



  useEffect(() => {
    if (sidebarRef.current) {
      if (isOpen) {
        
        gsap.fromTo(sidebarRef.current, 
          {
            x: '-100%',
            opacity: 0
          },
          {
            x: '0%',
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out'
          }
        );
      } else {
        
        gsap.to(sidebarRef.current, {
          x: '-100%',
          opacity: 0,
          duration: 0.6,
          ease: 'power3.in'
        });
      }
    }
  }, [isOpen]);

  const navigationLinks = [
    { href: '/', label: 'Home',tab:'' },
    { href: "/predict", label: "Disease Prediction",tab:'predict' },
    { href: "/health-checkup", label: "Health Checkup",tab:'health-checkup' },
    { href: "/chat", label: "Ask Questions",tab:'chat' },
    // { href: '#pricing', label: 'Pricing' },
    // { href: '#works', label: 'Health' },
    // { href: '#contact', label: 'Contact' }
  ];



  const [hoveredItem, setHoveredItem] = useState(null)

 

  return (


    <nav className="fixed top-0 lg:top-5 left-1/2  transform -translate-x-1/2 w-full max-w-[1800px]  border-solid lg:border-[1px] border-[#FFFFFF] border-b-[1px] border-opacity-[20%]  text-white lg:rounded-full  shadow-lg z-50">
      <div className="flex items-center justify-between  lg:rounded-full md:px-20 px-[30px] ">
        <Link to="/" className="flex items-center font-serif cursor-pointer ">
          <img
            src={Logo}
            alt="Logo"
            width={50}
            height={42}
            priority
            className='z-50 lg:w-[60px] ll:w-[70px] lg:h-[76px] md:w-[50px] md:h-[57px] '
          />
          {/* <span>PredictCare AI</span> */}
          <h1 className='text-3xl cursor-pointer z-50  '>PredictCare AI</h1>
        </Link>

        <button 
          className="lg:hidden z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={30} fill='#2C8C7D' /> : <FaBars size={30} fill='#2C8C7D' />}
        </button>

        

        <div className="hidden lg:flex space-x-8 text-[30px] ll:text-[30px] lg:text-[20px] font-light uppercase">
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="relative pb-[2px] transition-colors duration-200 ease-in-out hover:text-[#8b86d4] hover:font-normal "
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.label}
                {hoveredItem === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-custom-blue"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                {currTab === item.tab && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-custom-blue"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Link>
            ))}
        </div>

        {/* Mobile */}
        <div 
          ref={sidebarRef}
          className="fixed top-[-20px] opacity-0  h-[150vh] left-0 right-0 bottom-0 w-full  bg-black backdrop-blur-lg lg:hidden z-40"
         
        >
          <div className="flex  justify-start h-full ml-[20px] mt-[130px]">
            <ul className="flex flex-col gap-8 text-[20px] font-light uppercase text-center justify-start">
              {navigationLinks.map((link) => (
                <li key={link.href} className="hover:text-teal-400 transition-colors duration-300 ">
                  <Link 
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className='flex place-content-start cursor-pointer'
                  >
                    {link.label}
                    
                  </Link>
                </li>
              ))}
              <li className="flex  gap-[15px] text-[20px] mt-6 ">
                { !token && (<Link to='/login' 
                onClick={() => setIsOpen(false)}
                className="hover:text-teal-400 cursor-pointer transition-colors duration-300 ">Login</Link> )}
                {/* #Dashboard */}
                {token && (<Link to='/my-profile'
                onClick={() => setIsOpen(false)}
                 className="hover:text-teal-400 cursor-pointer  transition-colors duration-300">Dashboard</Link>)}
                {!token && (<Link to='/signup'
                onClick={() => setIsOpen(false)}
                 className="hover:text-teal-400 cursor-pointer text-[#ffffff]/70 transition-colors duration-300">SignUp</Link>)}
                {/* Logout */}
                {token && (<Link to='/'
                onClick={() => {
                  setIsOpen(false)
                  dispatch(logout(navigate))
                }}
                 className="hover:text-teal-400 cursor-pointer text-[#ffffff]/70 transition-colors duration-300">Logout</Link>)}
              </li>
            </ul>
          </div>
        </div>

        
        <div className="hidden lg:flex items-center space-x-4 text-[30px] lg:text-[22px] ll:text-[30px]">
          { !token && (<Link to='/login' className={`hover:text-teal-400 cursor-pointer transition-colors duration-300 ${currTab === 'login'? 'text-teal-400':''}`}>Login</Link> )}
          {/* #Dashboard */}
          {token && (<Link to="/my-profile" className={`hover:text-teal-400 cursor-pointer transition-colors duration-300 ${currTab === 'my-profile'?'text-teal-400' :''  } `}>Dashboard</Link>)}
          {/* <span>/</span> */}
          {!token && (<Link to="/signup" className={`hover:text-teal-400 text-[#ffffff]/70 cursor-pointer transition-colors duration-300 ${currTab === 'signup' ? 'text-teal-400':''}` }>SignUp</Link>)}
          {/* Logout */}
          {token && (<Link to="/" className={`hover:text-teal-400 text-[#ffffff]/70 cursor-pointer transition-colors duration-300 ${currTab === 'logout' ?'text-teal-400':''}`}
          onClick={() => dispatch(logout(navigate))}
          >Logout</Link>)}
        </div>
      </div>
    </nav>


  );
}
















// ---------
// import { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Logo from '../assets/Logo.webp';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import gsap from 'gsap';
// import { useSelector } from 'react-redux';
// import { motion } from "framer-motion";

// export default function Navbar() {
//   const { token } = useSelector((state) => state.auth);
//   const [isOpen, setIsOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const [currTab, setCurrTab] = useState('');
//   const location = useLocation();

//   useEffect(() => {
//     // Extract the last segment of the path
//     const pathSegments = location.pathname.split('/');
//     const tab = pathSegments[pathSegments.length - 1];
//     setCurrTab(tab);
//   }, [location.pathname]); // Only run when location.pathname changes

//   useEffect(() => {
//     if (sidebarRef.current) {
//       if (isOpen) {
//         gsap.fromTo(
//           sidebarRef.current,
//           {
//             x: '-100%',
//             opacity: 0,
//           },
//           {
//             x: '0%',
//             opacity: 1,
//             duration: 0.6,
//             ease: 'power3.out',
//           }
//         );
//       } else {
//         gsap.to(sidebarRef.current, {
//           x: '-100%',
//           opacity: 0,
//           duration: 0.6,
//           ease: 'power3.in',
//         });
//       }
//     }
//   }, [isOpen]);

//   const navigationLinks = [
//     { href: '/', label: 'Home', tab: '' },
//     { href: "/predict", label: "Disease Prediction", tab: 'predict' },
//     { href: "/health-checkup", label: "Health Checkup", tab: 'health-checkup' },
//     { href: "/chat", label: "Ask Questions", tab: 'chat' },
//   ];

//   const [hoveredItem, setHoveredItem] = useState(null);

//   return (
//     <nav className="fixed top-0 lg:top-5 left-1/2  transform -translate-x-1/2 w-full max-w-[1800px]  border-solid lg:border-[1px] border-[#FFFFFF] border-b-[1px] border-opacity-[20%]  text-white lg:rounded-full  shadow-lg z-50">
//       <div className="flex items-center justify-between  lg:rounded-full md:px-20 px-[30px] ">
//         <Link to="/" className="flex items-center font-serif cursor-pointer ">
//           <img
//             src={Logo}
//             alt="Logo"
//             width={50}
//             height={42}
//             priority
//             className='z-50 lg:w-[60px] ll:w-[70px] lg:h-[76px] md:w-[50px] md:h-[57px] '
//           />
//           <h1 className='text-3xl cursor-pointer z-50  '>PredictCare AI</h1>
//         </Link>

//         <button
//           className="lg:hidden z-50"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle menu"
//         >
//           {isOpen ? <FaTimes size={30} fill='#2C8C7D' /> : <FaBars size={30} fill='#2C8C7D' />}
//         </button>

//         <div className="hidden lg:flex space-x-8 text-[30px] ll:text-[30px] lg:text-[20px] font-light uppercase">
//           {navigationLinks.map((item) => (
//             <Link
//               key={item.href}
//               to={item.href}
//               className="relative pb-[2px] transition-colors duration-200 ease-in-out hover:text-[#8b86d4] hover:font-normal "
//               onMouseEnter={() => setHoveredItem(item.href)}
//               onMouseLeave={() => setHoveredItem(null)}
//             >
//               {item.label}
//               {(hoveredItem === item.href || currTab === item.tab) && (
//                 <motion.div
//                   className="absolute bottom-0 left-0 right-0 h-0.5 bg-custom-blue"
//                   layoutId="underline"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 />
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* Mobile */}
//         <div
//           ref={sidebarRef}
//           className="fixed top-[-20px] opacity-0  h-[150vh] left-0 right-0 bottom-0 w-full  bg-black backdrop-blur-lg lg:hidden z-40"
//         >
//           <div className="flex  justify-start h-full ml-[20px] mt-[130px]">
//             <ul className="flex flex-col gap-8 text-[20px] font-light uppercase text-center justify-start">
//               {navigationLinks.map((link) => (
//                 <li key={link.href} className="hover:text-teal-400 transition-colors duration-300 ">
//                   <Link
//                     to={link.href}
//                     onClick={() => setIsOpen(false)}
//                     className='flex place-content-start cursor-pointer'
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//               <li className="flex  gap-[15px] text-[20px] mt-6 ">
//                 {!token && (<Link to='/login' className="hover:text-teal-400 cursor-pointer transition-colors duration-300 ">Login</Link>)}
//                 {token && (<Link to='/my-profile' className="hover:text-teal-400 cursor-pointer  transition-colors duration-300">Dashboard</Link>)}
//                 {!token && (<Link to='/signup' className="hover:text-teal-400 cursor-pointer text-[#ffffff]/70 transition-colors duration-300">SignUp</Link>)}
//                 {token && (<Link to='/logout' className="hover:text-teal-400 cursor-pointer text-[#ffffff]/70 transition-colors duration-300">Logout</Link>)}
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="hidden lg:flex items-center space-x-4 text-[30px] lg:text-[22px] ll:text-[30px]">
//           {!token && (<Link to='/login' className="hover:text-teal-400 cursor-pointer transition-colors duration-300">Login</Link>)}
//           {token && (<Link to="/my-profile" className="hover:text-teal-400 cursor-pointer transition-colors duration-300">Dashboard</Link>)}
//           {!token && (<Link to="/signup" className="hover:text-teal-400 text-[#ffffff]/70 cursor-pointer transition-colors duration-300">SignUp</Link>)}
//           {token && (<Link to="/logout" className="hover:text-teal-400 text-[#ffffff]/70 cursor-pointer transition-colors duration-300">Logout</Link>)}
//         </div>
//       </div>
//     </nav>
//   );
// }













// {/* Desktop*/}
//         {/* <ul className="hidden lg:flex space-x-8 text-[30px] ll:text-[30px] lg:text-[20px] font-light uppercase ">
//           {navigationLinks.map((link) => (
//             // <li key={link.href} className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">
//               <Link 
//               href={link.href}
//               key={link.href}
//               onMouseEnter={() => setHoveredItem(link.href)}
//               onMouseLeave={() => setHoveredItem(null)}
//               className='duration-200 ease-in-out hover:text-indigo-600 transition-colors'
//               >
//                 {link.label}
//                 {hoveredItem === link.href && (
//                   <motion.div
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
//                     layoutId="underline"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                   />
//                 )}
//                 </Link>
            
//           ))}
//         </ul> */}
























// import { useState, useEffect, useRef } from "react"
// import { Link } from "react-router-dom"
// import Logo from "../assets/Logo.webp"
// import { FaBars, FaTimes } from "react-icons/fa"
// import gsap from "gsap"
// import { useSelector } from "react-redux"
// import { motion } from "framer-motion"

// export default function Navbar() {
//   const { token } = useSelector((state) => state.auth)
//   const [isOpen, setIsOpen] = useState(false)
//   const sidebarRef = useRef(null)
//   const [hoveredItem, setHoveredItem] = useState(null)

//   const navigationLinks = [
//     { href: "/home", label: "Home" },
//     { href: "/predict", label: "Disease Prediction" },
//     { href: "/health-checkup", label: "Health Checkup" },
//     { href: "/chat", label: "Ask Questions" },
//   ]

//   useEffect(() => {
//     if (sidebarRef.current) {
//       if (isOpen) {
//         gsap.fromTo(
//           sidebarRef.current,
//           { x: "-100%", opacity: 0 },
//           { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" },
//         )
//       } else {
//         gsap.to(sidebarRef.current, {
//           x: "-100%",
//           opacity: 0,
//           duration: 0.6,
//           ease: "power3.in",
//         })
//       }
//     }
//   }, [isOpen])

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-2">
//               <img src={Logo || "/placeholder.svg"} alt="Logo" className="w-12 h-12" />
//               <span className="text-2xl font-bold">PredictCare AI</span>
//             </Link>
//           </div>

//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               {navigationLinks.map((item) => (
//                 <Link
//                   key={item.href}
//                   to={item.href}
//                   className="relative px-3 py-2 rounded-md text-sm font-medium hover:text-teal-400 transition-colors duration-200"
//                   onMouseEnter={() => setHoveredItem(item.href)}
//                   onMouseLeave={() => setHoveredItem(null)}
//                 >
//                   {item.label}
//                   {hoveredItem === item.href && (
//                     <motion.div
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400"
//                       layoutId="underline"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                     />
//                   )}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <div className="hidden md:block">
//             <div className="ml-4 flex items-center md:ml-6">
//               {!token && (
//                 <Link
//                   to="/login"
//                   className="text-sm font-medium hover:text-teal-400 transition-colors duration-200 mr-4"
//                 >
//                   Login
//                 </Link>
//               )}
//               {token && (
//                 <Link
//                   to="/my-profile"
//                   className="text-sm font-medium hover:text-teal-400 transition-colors duration-200 mr-4"
//                 >
//                   Dashboard
//                 </Link>
//               )}
//               {!token && (
//                 <Link to="/signup" className="text-sm font-medium hover:text-teal-400 transition-colors duration-200">
//                   Sign Up
//                 </Link>
//               )}
//               {token && (
//                 <Link to="/logout" className="text-sm font-medium hover:text-teal-400 transition-colors duration-200">
//                   Logout
//                 </Link>
//               )}
//             </div>
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-teal-400 focus:outline-none"
//             >
//               {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div
//         ref={sidebarRef}
//         className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-95 z-40 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out`}
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           {navigationLinks.map((item) => (
//             <Link
//               key={item.href}
//               to={item.href}
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               {item.label}
//             </Link>
//           ))}
//           {!token && (
//             <Link
//               to="/login"
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Login
//             </Link>
//           )}
//           {token && (
//             <Link
//               to="/my-profile"
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Dashboard
//             </Link>
//           )}
//           {!token && (
//             <Link
//               to="/signup"
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Sign Up
//             </Link>
//           )}
//           {token && (
//             <Link
//               to="/logout"
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Logout
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }












































// import { useState, useEffect, useRef } from "react"
// import { Link } from "react-router-dom"
// import Logo from "../assets/Logo.webp"
// import { FaBars, FaTimes } from "react-icons/fa"
// import gsap from "gsap"
// import { useSelector } from "react-redux"
// import { motion } from "framer-motion"

// export default function Navbar() {
//   const { token } = useSelector((state) => state.auth)
//   const [isOpen, setIsOpen] = useState(false)
//   const sidebarRef = useRef(null)
//   const [hoveredItem, setHoveredItem] = useState(null)

//   const navigationLinks = [
//     { href: "/home", label: "Home" },
//     { href: "/predict", label: "Disease Prediction" },
//     { href: "/health-checkup", label: "Health Checkup" },
//     { href: "/chat", label: "Ask Questions" },
//   ]

//   useEffect(() => {
//     if (sidebarRef.current) {
//       if (isOpen) {
//         gsap.fromTo(
//           sidebarRef.current,
//           { x: "-100%", opacity: 0 },
//           { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" },
//         )
//       } else {
//         gsap.to(sidebarRef.current, {
//           x: "-100%",
//           opacity: 0,
//           duration: 0.6,
//           ease: "power3.in",
//         })
//       }
//     }
//   }, [isOpen])

//   return (
//     <nav className="fixed top-0 lg:top-5 left-1/2 transform -translate-x-1/2 w-full max-w-[1800px] border-solid lg:border-[1px] border-[#FFFFFF] border-b-[1px] border-opacity-[20%] text-white lg:rounded-full shadow-lg z-50">
//       <div className="flex items-center justify-between lg:rounded-full md:px-20 px-[30px] bg-black bg-opacity-50">
//         <div className="flex items-center">
//           <Link to="/" className="flex items-center space-x-2">
//             <img src={Logo || "/placeholder.svg"} alt="Logo" className="w-12 h-12" />
//             <span className="text-2xl font-bold">PredictCare AI</span>
//           </Link>
//         </div>

//         <div className="hidden md:block">
//           <div className="ml-10 flex items-baseline space-x-4">
//             {navigationLinks.map((item) => (
//               <Link
//                 key={item.href}
//                 to={item.href}
//                 className="relative px-3 py-2 rounded-md text-sm font-medium hover:text-teal-400 transition-colors duration-200"
//                 onMouseEnter={() => setHoveredItem(item.href)}
//                 onMouseLeave={() => setHoveredItem(null)}
//               >
//                 {item.label}
//                 {hoveredItem === item.href && (
//                   <motion.div
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400"
//                     layoutId="underline"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                   />
//                 )}
//               </Link>
//             ))}
//           </div>
//         </div>

//         <div className="hidden md:block">
//           <div className="ml-4 flex items-center md:ml-6">
//             {!token && (
//               <Link to="/login" className="text-sm font-medium hover:text-teal-400 transition-colors duration-200 mr-4">
//                 Login
//               </Link>
//             )}
//             {token && (
//               <Link
//                 to="/my-profile"
//                 className="text-sm font-medium hover:text-teal-400 transition-colors duration-200 mr-4"
//               >
//                 Dashboard
//               </Link>
//             )}
//             {!token && (
//               <Link to="/signup" className="text-sm font-medium hover:text-teal-400 transition-colors duration-200">
//                 Sign Up
//               </Link>
//             )}
//             {token && (
//               <Link to="/logout" className="text-sm font-medium hover:text-teal-400 transition-colors duration-200">
//                 Logout
//               </Link>
//             )}
//           </div>
//         </div>

//         <div className="md:hidden">
//           <button className="lg:hidden z-50 text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
//             {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div
//         ref={sidebarRef}
//         className="fixed top-[-20px] opacity-0 h-[150vh] left-0 right-0 bottom-0 w-full bg-black backdrop-blur-lg lg:hidden z-50"
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           {navigationLinks.map((item) => (
//             <Link
//               key={item.href}
//               to={item.href}
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               {item.label}
//             </Link>
//           ))}
//           {!token && (
//             <Link
//               to="/login"
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Login
//             </Link>
//           )}
//           {token && (
//             <Link
//               to="/my-profile"
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Dashboard
//             </Link>
//           )}
//           {!token && (
//             <Link
//               to="/signup"
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Sign Up
//             </Link>
//           )}
//           {token && (
//             <Link
//               to="/logout"
//               className="block px-3 py-2 rounded-md text-base font-medium hover:text-teal-400 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Logout
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }


