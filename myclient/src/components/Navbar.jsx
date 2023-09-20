import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { ic_car_challenge1 } from "../assets";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="head-nav">
      <nav
        className={`fixed top-0 w-full  ${
          isScrolled
            ? "bg-[#1e1e20] shadow-2xl"
            : "bg-grey-50"
        } flex flex-wrap
      items-center
      justify-between
      w-full
      py-4
      md:py-0
      px-4
      z-1
      `}
      >
        <div className="flex flex-row items-center">
          <a href="#">
            <img src={ic_car_challenge1} alt=""  className="w-[50px]"/>
          </a>
          <h1 className="text-white text-center font-bold ml-[10px]"><span className='text-red-600'>C</span>AR <span className='text-red-600'>C</span>HALLENGE</h1>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          onClick={toggleMenu}
        >
          {/* SVG content */}
        </svg>

        <div
          className={`w-full md:flex md:items-center md:w-auto ${
            isDropdownOpen ? "block" : "hidden"
          }`}
          id="menu"
        >
          <ul
            className="
          pt-4
          text-base text-white
          md:flex
          md:justify-between 
          md:pt-0"
          >
            <li>
              <Link to="/">
                <a className="md:p-4 py-2 block font-bold hover:text-[#fa1a38]">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link to="/products">
                <a className="md:p-4 py-2 block font-bold hover:text-[#fa1a38]">
                  Product
                </a>
              </Link>
            </li>
            <li className="text-center">
              <Link to="/cart">
                <a className="md:p-4 py-2 block font-bold hover:text-[#fa1a38]">
                  <i className="fa-solid fa-shopping-cart"></i>
                </a>
                
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
