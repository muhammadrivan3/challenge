import React, { useEffect, useRef, useState } from "react";
import AddProduct from "./AddProduct";
import UDProduct from "./UDProduct";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ferrari_portofino1 } from "../../assets";
const Dasboard = () => {
  const ref = useRef(null);
  const { page, setpage } = useParams();
  const [moveTO, setmoveTO] = useState(setpage);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const defaultImageURL = "http://localhost:8081/images/";
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/cars")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setItems]);
  const handleMoveTo = (moveto) => {
    if (moveto == "add") {
      console.log("ADD KAWAN");
      setmoveTO("add");
    } else if (moveto == "ud") {
      console.log("ADD KAWAN");
      setmoveTO("ud");
    } else if (moveto == "dashboard") {
      setmoveTO("dashboard");
    }
  };
  return (
    <div className="h-screen flex justify-start">
      <div className="bg-[#1c1c1e] h-screen w-[150px] flex flex-col">
        <Link>
          <div
            className="bg-[#131313] text-white text-[1em] font-[900] mt-10 flex justify-start items-start"
            onClick={(e) => handleMoveTo("dashboard")}
          >
            <span className="p-5">DASHBOARD</span>
            <div className="flex justify-end items-center w-full h-full">
              <span className="border-2 h-10"></span>
            </div>
          </div>
        </Link>
        <Link>
          <div
            className=" bg-[#131313] text-white text-[1em] font-[900] mt-2 flex justify-start items-start"
            onClick={(e) => handleMoveTo("add")}
          >
            <span className="p-5">ADD</span>
            <div className="flex justify-end items-center w-full h-full">
              <span className="border-2 h-10"></span>
            </div>
          </div>
        </Link>
        <Link>
          <div
            className=" bg-[#131313] text-white text-[1em] font-[900] mt-2 flex justify-start items-start"
            onClick={(e) => handleMoveTo("ud")}
          >
            <span className="p-5">U&D</span>
            <div className="flex justify-end items-center w-full h-full">
              <span className="border-2 h-10"></span>
            </div>
          </div>
        </Link>
        {/* <div className=" bg-[#131313] text-white text-[1em] font-[900] mt-2 flex justify-start items-start">
        <span className="p-5">DELETE</span>
          <div className="flex justify-end items-center w-full h-full"><span className="border-2 h-10"></span></div>
        </div> */}
      </div>
      {moveTO === "add" ? (
        <AddProduct addproductPAGE={setmoveTO} />
      ) : moveTO === "ud" ? (
        <UDProduct />
      ) : (
        <div className="flex justify-center w-full ">
          {" "}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={`bg-[#131313] mt-5 w-[90%] rounded-xl p-5 `}
          >
            <div>
              <h1 className="text-center p-10 text-xl font-bold text-white">
                PRODUCT
              </h1>
              <div className="w-full p-5 mt-[-50px]">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#404042]">
                      <th className="px-6 py-3 bg-[#404042] text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 bg-[#404042] text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                        Car Name
                      </th>
                      <th className="px-6 py-3 bg-[#404042] text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                        Day Rate
                      </th>
                      <th className="px-6 py-3 bg-[#404042] text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                        Month Rate
                      </th>
                      <th className="px-6 py-3 bg-[#404042] text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#222222] divide-y divide-gray-200">
                    {items
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        (currentPage - 1) * itemsPerPage + itemsPerPage
                      )
                      .map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-no-wrap">
                            <img
                              src={defaultImageURL + item.Image} // Provide the image source URL
                              alt={item.CarName} // Provide alt text for accessibility
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm leading-5 font-medium text-white">
                                  {item.CarName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap">
                            <div className="text-sm leading-5 text-white">
                              {item.DayRate}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap">
                            <div className="text-sm leading-5 text-white">
                              {item.MonthRate}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-white">
                              $1000
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  } ${currentPage === 1 ? "pointer-events-none" : ""}`}
                  onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                  disabled={currentPage === 1}
                >
                  Sebelumnya
                </button>

                {Array.from(
                  { length: Math.ceil(items.length / itemsPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-600 hover:bg-blue-500 hover:text-white"
                      } ${
                        currentPage === index + 1 ? "cursor-not-allowed" : ""
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                      disabled={currentPage === index + 1}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === Math.ceil(items.length / itemsPerPage)
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  } ${
                    currentPage === Math.ceil(items.length / itemsPerPage)
                      ? "pointer-events-none"
                      : ""
                  }`}
                  onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                  disabled={
                    currentPage === Math.ceil(items.length / itemsPerPage)
                  }
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* <AddProduct/> */}
    </div>
  );
};

export default Dasboard;
