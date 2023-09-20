import React, { useEffect, useState } from "react";
import { Hero } from "../../components";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ModalOrder } from "../../components";
import {
  ferrari_portofino1,
  ic_betley,
  ic_bmw,
  ic_ferrari,
  ic_ford,
  ic_jeep,
  ic_lamborghini,
  ic_landrover,
  ic_lexus,
  ic_mazda,
  ic_mitsubishi,
  ic_nissan,
  ic_porsche,
  ic_subaru,
  ic_tesla,
  ic_volkswagen,
  ic_aggrement,
  ic_bribery,
  ic_dealership,
  ic_lease,
  ic_rent,
  aventador_car,
  buggati_car,
  lamborghini_aventador_car,
  lamborghini_car,
} from "../../assets";
import { Tilt } from "react-tilt";
import { InView } from "react-intersection-observer";

const Home = () => {
  const [items, setItems] = useState([]);
  const defaultImageURL = "http://localhost:8081/images/";
  const brands_icon = [
    ic_betley,
    ic_bmw,
    ic_ferrari,
    ic_ford,
    ic_jeep,
    ic_lamborghini,
    ic_landrover,
    ic_lexus,
    ic_mazda,
    ic_mitsubishi,
    ic_nissan,
    ic_porsche,
    ic_subaru,
    ic_tesla,
    ic_volkswagen,
  ];
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/cars")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  
  const [idCarOrders, setidCarOrders] = useState(null);
  const openModal = (dataID) => {
    setidCarOrders(dataID)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Hero />
      <div className="w-full h-screen p-14 bg-white">
        <h1 className="font-bold font-[Aloivytta] text-5xl text-center">
          OUR BRANDS
        </h1>
        <div className="grid grid-cols-3 md:grid-cols-5 md:gap-5 justify-center items-center w-[90%] ml-[10%] mt-[50px]">
          {brands_icon.map((items) => (
            <div className="p-1 w-[100px] rounded-xl shadow-xl">
              <img src={items} alt="" className="w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="bg-gray-800 w-[95%] absolute p-5 mt-[-0%] shadow-xl  rounded grid grid-cols-1 justify-center items-center">
          <div className="mt-[-0%] shadow-2xl bg-gray-700 rounded grid grid-cols-2  mx-auto md:grid-cols-5 md:gap-5 justify-center items-center">
            <div className="flex flex-col items-center m-[20px] shadow-2xl rounded ">
              <img src={ic_aggrement} alt="" className="w-[30px] md:w-[60px]" />
              <span className="text-white text-[0.8em]">
                EXPERIENCED SALES TEAM
              </span>
            </div>
            <div className="flex flex-col items-center m-[20px] shadow-2xl rounded ">
              <img src={ic_bribery} alt="" className="w-[30px] md:w-[60px]" />
              <span className="text-white text-[0.8em]">
                FIRST CLASS CUSTOMER CARE
              </span>
            </div>
            <div className="flex flex-col items-center m-[20px] shadow-2xl rounded ">
              <img
                src={ic_dealership}
                alt=""
                className="w-[30px] md:w-[60px]"
              />
              <span className="text-white text-[0.8em]">
                MULTIPLE DEALERSHIPS
              </span>
            </div>
            <div className="flex flex-col items-center m-[20px] shadow-2xl rounded ">
              <img src={ic_rent} alt="" className="w-[30px] md:w-[60px]" />
              <span className="text-white text-[0.8em]">
                OVER 3 DAYS EXPERIENCE
              </span>
            </div>
            <div className="flex flex-col items-center m-[20px] shadow-2xl rounded ">
              <img src={ic_lease} alt="" className="w-[30px] md:w-[60px]" />
              <span className="text-white text-[0.8em]">TRUSTED</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-[#090909] mt-[100px]">
        <h1 className="text-white p-10 text-2xl font-bold">POPULAR PRODUCT</h1>
        <div
          className="w-full flex justify-center items-center  bg-[#090909]"
          id="Products"
        >
          <div className="w-[90%] grid grid-cols-3 gap-3">
            {items.slice(0, 3).map((item) => {
              return (
                <div className="card w-full p-5 m-5  border-3 border-white rounded-3xl shadow-lg shadow-gray-400">
                  <div className="image bg-gray-300 rounded-lg h-[50%]">
                    <img
                      src={defaultImageURL + item.Image}
                      className="h-[100%] w-full"
                    />
                  </div>

                  <div className="products_text">
                    <h2 className="text-[1.5em] font-bold text-gray-300">
                      {item.CarName}
                    </h2>
                    <span className="font-bold text-gray-500">TOTAL</span>
                    <div className="flex">
                      <span className="text-[#ffbf00] font-medium text-[2em]">
                        ${item.DayRate}.99
                      </span>
                      <span className="text-[1em] text-[#ffbf00] font-medium ml-2 mr-2 text-center mt-[4%]">
                        /
                      </span>
                      <span
                        className="text-[1em] text-[#ffbf00] font-medium text-black mt-[4%]"
                        // style={{ textDecoration: "line-through" }}
                      >
                        Days
                      </span>
                    </div>
                    <div className="w-full grid grid-cols-4">
                      <div className="p-2 m-1 bg-gray-200 rounded-lg items-center text-center flex flex-col">
                        <i className="fa-solid fa-tachometer mr-[2px]"></i>
                        <span>211 mph</span>
                      </div>
                      <div className="p-2 m-1 bg-gray-200 rounded-lg items-center text-center flex flex-col">
                        <i className="fa-solid fa-user mr-[2px]"></i>
                        <span>2 seater</span>
                      </div>
                      <div className="p-2 m-1 bg-gray-200 rounded-lg items-center text-center flex flex-col">
                        <i className="fa-solid fa-gas-pump mr-[2px]"></i>
                        <span>12 city</span>
                      </div>
                      <div className="p-2 m-1 bg-gray-200 rounded-lg items-center text-center flex flex-col">
                        <i className="fa-solid fa-gears mr-[2px]"></i>
                        <span>7 s auto</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <a
                        onClick={() => openModal(item.CarID)}
                        // onClick={() => addToCart(item.CarID)}
                        className="bg-[#ffbf00] p-2 mt-[5px] rounded-lg text-[1em] text-white font-bold shadow-xl"
                      >
                        ORDER
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex justify-center mt-[10px] mb-[50px]">
          <Link to={"/products"}>
            <a className="border-3 bg-white p-2 rounded text-lg font-[600] shadow-lg shadow-gray-400 border-white">
              {" "}
              SHOW MORE
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-2">
          <div className="relative overflow-hidden">
            <div
              className="absolute flex flex-col justify-end items-start w-full h-[100%] z-20"
              style={{ pointerEvents: "none" }}
            >
              <div className="w-full flex justify-center items-center p-10">
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-[900] text-center font-[Aloivytta]">
                    HOT DAYS RATE
                  </span>
                  <span className="text-white text-xl font-[300] text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis est nemo,.
                  </span>
                </div>
              </div>
            </div>
            <img
              src={buggati_car}
              alt=""
              className="w-full h-full transform hover:scale-125 transition-transform duration-1000"
            />
          </div>
          <div className="relative overflow-hidden">
            <div
              className="absolute flex flex-col justify-end items-start w-full h-[100%] z-20"
              style={{ pointerEvents: "none" }}
            >
              <div className="w-full flex justify-center items-center p-10">
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-[900] text-center font-[Aloivytta]">
                    HOT MONTH RATE
                  </span>
                  <span className="text-white text-xl font-[300] text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis est nemo,.
                  </span>
                </div>
              </div>
            </div>
            <img
              src={aventador_car}
              alt=""
              className="w-full h-full transform hover:scale-125 transition-transform duration-1000"
            />
          </div>
          <div className="relative overflow-hidden">
            <div
              className="absolute flex flex-col justify-end items-start w-full h-[100%] z-20"
              style={{ pointerEvents: "none" }}
            >
              <div className="w-full flex justify-center items-center p-10">
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-[900] text-center font-[Aloivytta]">
                    GREAT QUALITY
                  </span>
                  <span className="text-white text-xl font-[300] text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis est nemo,.
                  </span>
                </div>
              </div>
            </div>
            <img
              src={lamborghini_car}
              alt=""
              className="w-full h-full transform hover:scale-125 transition-transform duration-1000"
            />
          </div>
          <div className="relative overflow-hidden">
            <div
              className="absolute flex flex-col justify-end items-start w-full h-[100%] z-20"
              style={{ pointerEvents: "none" }}
            >
              <div className="w-full flex justify-center items-center p-10">
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-[900] text-center font-[Aloivytta]">
                    APROVED
                  </span>
                  <span className="text-white text-xl font-[300] text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis est nemo,.
                  </span>
                </div>
              </div>
            </div>
            <img
              src={lamborghini_aventador_car}
              alt=""
              className="w-full h-full transform hover:scale-125 transition-transform duration-1000"
            />
          </div>
        </div>
        <div className="bg-[#404042] flex justify-center items-center p-3">
          <i className="fa-solid fa-close text-red-600"></i>
          <span className="text-white text-2xl font-[900]">SUPERCAR</span>
          <i className="fa-solid fa-close text-red-600"></i>
        </div>
      </div>
      <ModalOrder
        isOpen={isModalOpen}
        onClose={closeModal}
        dataID={idCarOrders}
        setData={setModalData}
      />
    </>
  );
};

export default Home;
