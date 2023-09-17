import React from "react";
import { car_cinematic } from "../assets";
const Hero = () => {
  return (
    <div className="relative w-full h-screen mx-auto bg-black" id="hi">
      <div className="bg-animation-cursor z-0">
      <div>
      <video className="w-full h-screen" autoPlay loop muted>
        <source src={car_cinematic} type="video/mp4" />
        {/* Anda dapat menambahkan sumber video tambahan di sini jika diperlukan */}
        {/* <source src="URL_VIDEO_LAIN" type="video/other-format" /> */}
        Maaf, browser Anda tidak mendukung pemutaran video.
      </video>
    </div>
      </div>
    </div>
  );
};

export default Hero;
