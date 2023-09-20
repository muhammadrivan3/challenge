import React, { useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import axios from "axios";
import { ModalOrder } from "../../components";

const Product = () => {
  const [items, setItems] = useState([]);
  const [idCarOrders, setidCarOrders] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDayRate, setSearchDayRate] = useState(1000);
  const [searchMonthRate, setSearchMonthRate] = useState(1000);
  const [FilteredItems, setFilteredItems] = useState([]);
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
  }, []);
  useEffect(() => {
    // Lakukan pencarian otomatis di sini berdasarkan nilai searchQuery
    const filteredItems = items.filter((item) =>
      item.CarName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }, [searchQuery, items]);
  useEffect(() => {
    // Lakukan pencarian berdasarkan nilai monthRate di sini
    const filteredItemsByDayRate = items.filter((item) => item.DayRate <= searchDayRate);
    setFilteredItems(filteredItemsByDayRate);
  }, [searchDayRate, items]);
  useEffect(() => {
    // Lakukan pencarian berdasarkan nilai monthRate di sini
    const filteredItemsByMonthRate = items.filter(
      (item) => item.MonthRate >= searchMonthRate
    );
    setFilteredItems(filteredItemsByMonthRate);
  }, [searchMonthRate, items]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const openModal = (dataID) => {
    setidCarOrders(dataID)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`w-full flex justify-start bg-[#181818] min-h-screen `}>
      <div className="w-[20%] h-[50%]  bg-[#181818] border-3 border-white shadow-lg shadow-gray-400 rounded flex flex-col ml-[10px] mt-[120px] ">
        <h1 className="p-2 text-lg font-bold text-gray-300">FILTER</h1>
        <div className="p-3">
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-300 sr-only dark:text-gray-300"
            >
              Search Car
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Car"
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
        <div className="p-3">
          <div className="flex justify-between">
            <label
              htmlFor="default-range"
              className="block text-sm font-medium text-red-600 dark:text-gray-300"
            >
              Day Rate
            </label>
            <div className="w-[80%] flex justify-end">
              <div className="bg-gray-700 rounded">
                <span className="text-white p-1">{searchDayRate}</span>
              </div>
            </div>
          </div>
          <input
            id="default-range"
            type="range"
            value={searchDayRate}
            min={"0"}
            max={"3000"}
            onChange={(e) => setSearchDayRate(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800"
          />
        </div>
        <div className="p-3">
          <div className="flex justify-between">
            <label
              for="default-range1"
              className="block text-sm font-medium text-red-600 dark:text-gray-300"
            >
              Month Rate
            </label>
            <div className="w-[70%] flex justify-end">
              <div className="bg-gray-700 rounded">
                <span className="text-white p-1">{searchMonthRate}</span>
              </div>
            </div>
          </div>
          <input
            id="default-range1"
            type="range"
            value={searchMonthRate}
            min={"0"}
            max={"3000"} // Gantilah MAX_VALUE dengan nilai maksimum yang sesuai
            onChange={(e) => setSearchMonthRate(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      <div className="w-full h-[50%]  rounded flex flex-col mt-[100px] mb-[100px]">
        <div className="w-full flex justify-center items-center " id="Products">
          <div className="w-[95%] grid grid-cols-3 gap-4">
            {FilteredItems.map((item) => {
              return (
                <div className="card w-full p-5 m-5  bg-[#181818] border-3 border-white rounded-3xl shadow-lg shadow-gray-400">
                  <div className="image bg-gray-300 rounded-lg h-[50%] flex flex-col">
                    <img
                      src={defaultImageURL + item.Image}
                      className="h-[100%] w-full"
                    />
                  </div>

                  <div className="products_text">
                    <h2 className="text-[1.5em] font-bold text-gray-300">
                      {item.CarName}
                    </h2>
                    <span className="font-bold text-gray-400">TOTAL</span>
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
                        <span>211</span>
                      </div>
                      <div className="p-2 m-1 bg-gray-200 rounded-lg items-center text-center flex flex-col">
                        <i className="fa-solid fa-user mr-[2px]"></i>
                        <span>2</span>
                      </div>
                      <div className="p-2 m-1 bg-gray-200 rounded-lg items-center text-center flex flex-col">
                        <i className="fa-solid fa-gas-pump mr-[2px]"></i>
                        <span>12 city</span>
                      </div>
                      <div className="p-2 m-1 bg-gray-200 rounded-lg items-center text-center flex flex-col">
                        <i className="fa-solid fa-gears mr-[2px]"></i>
                        <span>7 auto</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <a
                        // onClick={() => addToCart(item.CarID)}
                        onClick={() => openModal(item.CarID)}
                        className="bg-[#ffbf00] p-2 mt-[5px] rounded-lg text-[1em] h-full text-white font-bold shadow-xl"
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
      </div>
      <ModalOrder
        isOpen={isModalOpen}
        onClose={closeModal}
        dataID={idCarOrders}
        setData={setModalData}
      />
    </div>
  );
};

export default Product;
