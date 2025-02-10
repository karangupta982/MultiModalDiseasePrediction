// import React, { useEffect } from "react";
// import gsap from "gsap";

// const Loader = ({ text,speed }) => {
//   useEffect(() => {
//     const tl = gsap.timeline({ repeat: -1 });
    
//     tl.to(".a", {
//       y: -10,
//       duration: 0.5,
//       stagger: 0.25,
//     }).to(".a", {
//       y: 0,
//       duration: 0.5,
//       stagger: 0.25,
//     }, `-=${speed}`);
//   }, []);

//   return (
//     <div className="flex space-x-[2px] text-3xl font-bold justify-center items-center h-screen">
//       {text.split("").map((char, index) => (
//         <span key={index} className="a ">{char}</span>
//       ))}
//     </div>
//   );
// };

// const Loader = ()=>{
//   useEffect(()=>{
//     gsap.from('.box',{
//       opacity:0,
//       delay:1,
//       stagger:{
//           // from:'start',
//           // from:'end',
//           // from:'edges',
//           from:'center',
//           each:0.2, // har box apne pehle wale box ke animation ke 0.2 second baad chalega 
//       },
//       repeat:-1,
//   },[])
//   })
//   return (
//     <div className="flex justify-center gap-[1vw] h-screen items-center opacity-100 w-screen bg-black ">
//       <div className="box w-[1vw] h-[2vh] bg-white"></div>
//       <div className="box w-[1vw] h-[1vh] bg-white"></div>
//       <div className="box w-[1vw] h-[1vh] bg-white"></div>
//       <div className="box w-[1vw] h-[1vh] bg-white"></div>
//       <div className="box w-[1vw] h-[1vh] bg-white"></div>
//     </div>
//   )
// }

// export default Loader;





import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const containerRef = useRef(null); // Ref for the container

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
    }, containerRef); // Scope the context to the container

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div
      className="flex justify-center gap-[1vw] w-fit items-center opacity-100 bg-richblack-900"
      ref={containerRef} // Attach the ref to the container
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
