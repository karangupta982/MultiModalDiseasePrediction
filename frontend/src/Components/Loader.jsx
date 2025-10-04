import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.box', {
        opacity: 0,
        delay: 1,
        stagger: {
          from: 'center',
          each: 0.2,
        },
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });
    }, containerRef); 

    return () => ctx.revert(); 
  }, []);

  return (
    <div
      className="flex justify-center gap-[1vw] w-fit items-center opacity-100 bg-richblack-900"
      ref={containerRef} 
    >
      <div className="box w-[0.7vw] h-[1.5vh] bg-white"></div>
      <div className="box w-[0.7vw] h-[1.5vh] bg-white"></div>
      <div className="box w-[0.7vw] h-[1.5vh] bg-white"></div>
      <div className="box w-[0.7vw] h-[1.5vh] bg-white"></div>
      <div className="box w-[0.7vw] h-[1.5vh] bg-white"></div>
    </div>
  );
};

export default Loader;
