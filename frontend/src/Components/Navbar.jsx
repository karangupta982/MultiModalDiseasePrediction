import { useState, useEffect, useRef } from 'react';
import Link from 'react-router-dom';
import Logo from '../assets/Logo.svg'
import { FaBars, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

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
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'Health Checkup' },
    { href: '#services', label: 'Services' },
    // { href: '#pricing', label: 'Pricing' },
    // { href: '#works', label: 'Health' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 lg:top-5 left-1/2 transform -translate-x-1/2 w-full max-w-[1800px] bg-[#000000] bg-opacity-[20%] border-solid lg:border-[1px] border-[#FFFFFF] border-b-[1px] border-opacity-[20%] backdrop-blur-lg text-white lg:rounded-full p-[1px] font-kanit shadow-lg z-10">
      <div className="flex items-center justify-between bg-[#000000]/[20%]  lg:rounded-full md:px-20 px-[30px] py-3">
        <div className="flex items-center space-x-2 ">
          <img
            src={Logo}
            alt="Logo"
            width={50}
            height={42}
            priority
            className='z-50 lg:w-[60px] ll:w-[70px] lg:h-[76px] md:w-[50px] md:h-[57px] '
          />
        </div>

        <button 
          className="lg:hidden z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={30} fill='#2C8C7D' /> : <FaBars size={30} fill='#2C8C7D' />}
        </button>

        {/* Desktop*/}
        <ul className="hidden lg:flex space-x-8 text-[30px] ll:text-[30px] lg:text-[20px] font-light uppercase">
          {navigationLinks.map((link) => (
            <li key={link.href} className="hover:text-teal-400 transition-colors duration-300">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

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
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className='flex place-content-start'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex  gap-[15px] text-[20px] mt-6 ">
                <span className="hover:text-teal-400 cursor-pointer transition-colors duration-300">Login</span> 
                {/* #Dashboard */}
                <span className="hover:text-teal-400 cursor-pointer transition-colors duration-300">SignUp</span>
                {/* Logout */}
              </li>
            </ul>
          </div>
        </div>

        
        <div className="hidden lg:flex items-center space-x-4 text-[30px] lg:text-[22px] ll:text-[30px]">
          <span className="hover:text-teal-400 cursor-pointer transition-colors duration-300">EN</span>
          <span className="hover:text-teal-400 text-[#ffffff]/30 cursor-pointer transition-colors duration-300">DE</span>
        </div>
      </div>
    </nav>
  );
}