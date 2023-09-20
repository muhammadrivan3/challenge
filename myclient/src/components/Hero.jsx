// import React from "react";
// import { car_cinematic } from "../assets";
// const Hero = () => {
//   return (
//     <div className="relative w-full h-screen mx-auto bg-black" id="hi">
//       <div className="bg-animation-cursor z-0">
//       <div>
//       <video className="w-full h-screen" autoPlay loop muted>
//         <source src={car_cinematic} type="video/mp4" />
//         {/* Anda dapat menambahkan sumber video tambahan di sini jika diperlukan */}
//         {/* <source src="URL_VIDEO_LAIN" type="video/other-format" /> */}
//         Maaf, browser Anda tidak mendukung pemutaran video.
//       </video>
//     </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React, { useState, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import {
  ferrari_portofino1,
  ferrari_portofino2,
  ferrari_portofino3
} from "../assets";
import { Link } from "react-router-dom";

const Hero = () => {
  const movieItems = [
    ferrari_portofino1,
    ferrari_portofino2,
    ferrari_portofino3,
  ];
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="h-screen bg-black">
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        // modules={[Pagination]}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-screen"
      >
        {movieItems.map((item) => (
          <SwiperSlide key={item.id} className="text-center">
            <div className="h-[30px] absolute z-20 mt-[45%] w-full flex justify-center"><Link to="/products"><div className="border-2 p-2 flex justify-center items-center"><span className="text-white">READ MORE <i className="fa-solid fa-arrow-right text-white"></i></span> </div></Link></div>
            <img src={item} alt="" className="w-full h-screen"/>
            
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle} className="progress-circle">
            <circle cx="24" cy="24" r="20" stroke-dasharray="5 5"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
        
      </Swiper>
      
      <div className="h-[30px] bg-gradient-to-t from-black via-transparent to-transparent w-full absolute mt-[-30px] z-10"></div>
    </div>
  );
};
export default Hero;
