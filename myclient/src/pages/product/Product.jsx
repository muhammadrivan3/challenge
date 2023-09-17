import React, { useEffect, useState } from "react";
import { s1, s2, s3, s4, s5 } from "../../assets";
import { Await, Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [items, setItems] = useState([]);
  const [idCarOrders, setidCarOrders] = useState(null);
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
  const addToCart = async (itemID) => {
    // // Permintaan pertama untuk mengambil data dari tabel 1
    // axios
    //   .get("http://localhost:8081/api/v1/orders")
    //   .then((response1) => {
    //     // Lakukan permintaan kedua untuk mengambil data dari tabel 2
    //     axios
    //       .get("http://localhost:8081/api/v1/cars")
    //       .then((response2) => {
    //         // Gabungkan data dari kedua respons berdasarkan ID yang sama
    //         const mergedData = mergeData(response1.data, response2.data, "CardID");
    //         console.log(mergedData);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    const currentDate = new Date();
    const data = {
      OrderID: Math.floor(Math.random() * 1000000),
      CarID: itemID,
      OrderDate: currentDate,
      PickupDate: currentDate,
      DropoffDate: currentDate,
      PickupLocation: "PADANG",
      DropoffLocation: "PADANG",
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/orders",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // "Origin": "http://127.0.0.1:5173", // Jika diperlukan Origin header
          },
        }
      );
      console.log(response.data);
      // Handle the server response here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-gray-950 flex justify-start ">
      <div className="w-[20%] h-[50%] bg-white rounded flex flex-col ml-[10px] mt-[120px] ">
        <h1 className="p-2 text-lg font-bold">FILTER</h1>
        <div className="p-3">
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search Car
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Car"
                required
              />
              {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </form>
        </div>
        <div className="p-3">
          <label
            for="default-range"
            class="block text-sm font-medium text-red-600 dark:text-black"
          >
            Day Rate
          </label>
          <input
            id="default-range"
            type="range"
            value="50"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
        <div className="p-3"><label
            for="default-range"
            class="block text-sm font-medium text-red-600 dark:text-black"
          >
            Month Rate
          </label>
          <input
            id="default-range"
            type="range"
            value="50"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          /></div>
      </div>
      <div className="w-full h-[50%] bg-white rounded flex flex-col mt-[100px]">
        <div
          className="w-full flex justify-center items-center bg-gray-950"
          id="Products"
        >
          <div className="w-[95%] grid grid-cols-4 gap-4">
            {items.map((item) => {
              return (
                <div className="card w-[250px] p-5 m-5 bg-white border-3 border-white rounded-3xl shadow-lg shadow-gray-400">
                  <div className="small_card">
                    <i className="fa-solid fa-heart"></i>
                    <i className="fa-solid fa-share mt-[10px]"></i>
                  </div>
                  <div className="image bg-gray-300 rounded-lg">
                    <Link to="/products/car">
                      <img src={defaultImageURL + item.Image} />
                    </Link>
                  </div>

                  <div className="products_text">
                    <h2 className="text-lg font-bold">{item.CarName}</h2>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                    <h3>$100.99</h3>
                    <div className="products_star text-yellow-300">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <div className="flex justify-end">
                      <a
                        // href="#"
                        className="bg-yellow-300 p-1 rounded-lg text-[1em] font-bold"
                        // onClick={() => openModal(item.ID)}
                        onClick={() => addToCart(item.CarID)}
                      >
                        Add To Cart
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
