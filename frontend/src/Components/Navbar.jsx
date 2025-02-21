import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import Logo from '../assets/Logo.webp'
import Logo from '../assets/knot.png'
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
    
  ];



  const [hoveredItem, setHoveredItem] = useState(null)

 

  return (


    <nav className="fixed top-0 lg:top-5 left-1/2  transform -translate-x-1/2 w-full max-w-[1800px]  border-solid lg:border-[1px] border-[#FFFFFF] border-b-[1px] border-opacity-[20%]  text-white lg:rounded-full  shadow-lg z-50">
      <div className="mt-[1vh]  flex items-center justify-between  lg:rounded-full md:px-20 px-[30px] ">
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
          <h1 className='md:text-3xl text-xl cursor-pointer z-50  '>PredictCare AI</h1>
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
