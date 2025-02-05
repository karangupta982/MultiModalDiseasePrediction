import React, { useEffect } from "react";
import gsap from "gsap";

const Loader = ({ text,speed }) => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(".a", {
      y: -10,
      duration: 0.5,
      stagger: 0.25,
    }).to(".a", {
      y: 0,
      duration: 0.5,
      stagger: 0.25,
    }, `-=${speed}`);
  }, []);

  return (
    <div className="flex space-x-[2px] text-3xl font-bold justify-center items-center h-screen">
      {text.split("").map((char, index) => (
        <span key={index} className="a ">{char}</span>
      ))}
    </div>
  );
};

export default Loader;
