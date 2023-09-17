import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { ic_challange } from "../assets";

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
            ? "border-grey-200 bg-grey-50 dark:bg-gray-900 dark:bg-gray-900 shadow-xl"
            : "bg-transparent"
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
            <img src={ic_challange} alt="" />
          </a>
          <h1 className="text-white text-center font-bold">CHALLENGE</h1>
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
                  Cart
                </a>
              </Link>
            </li>
            <li className="text-center relative group">
              <a
                onClick={toggleMenu}
                className="md:p-4 py-2 block font-bold hover:text-[#fa1a38] cursor-pointer"
              >
                <i className="fa-solid fa-cog" />
              </a>
              <Transition
                show={isDropdownOpen}
                enter="transition-transform duration-300 ease-out"
                enterFrom="scale-75 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition-transform duration-300 ease-out"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-75 opacity-0"
              >
                {(ref) => (
                  <div
                    ref={ref}
                    className="absolute top-[-10px] right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link to="/products/add">
                          <a className="text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            ADD
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/ud">
                          <a className="text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            UPDATE & DELETE
                          </a>
                        </Link>
                      </li>
                      {/* Tambahkan item dropdown lainnya di sini */}
                    </ul>
                  </div>
                )}
              </Transition>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
