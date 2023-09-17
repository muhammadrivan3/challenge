import React, { useEffect, useState } from "react";
import { Hero } from "../../components";
import { s1, s2, s3, s4, s5 } from "../../assets";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [promoItems, setpromoItems] = useState([]);
  const defaultImageURL = "http://localhost:8081/images/"
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/cars")
      .then((response) => {
        setItems(response.data);
        if (response.data.length > 0) {
          // Jika ada data dalam response, atur promoItem ke data pertama
          setpromoItems(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const addToCart = async (itemID) => {
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
    <>
      <Hero />
      <div className="w-full h-screen p-14 bg-white">
        <h1 className="font-bold text-5xl text-center">HOT PROMO</h1>
        <div className="flex flex-col md:flex-row justify-center items-center">
          {promoItems && (
            <>
              <div className="p-10">
                <img
                  src={defaultImageURL+promoItems.Image}
                  alt="Main Image"
                  className="bg-bg-gray-100 border-3 border-gray-950 rounded-3xl h-96 p-14 shadow-2xl w-full md:w-auto md:max-w-xs  "
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row md:w-auto md:max-w-xs">
                  <img
                    src={defaultImageURL+promoItems.Image}
                    alt="Main Image"
                    className="bg-bg-gray-100 border-3 border-gray-950 rounded-3xl h-[100px] p-5 ml-[10px] shadow-2xl md:w-auto md:max-w-xs sm:w-[50%]  "
                  />
                  <img
                    src={defaultImageURL+promoItems.Image}
                    alt="Main Image"
                    className="bg-bg-gray-100 border-3 border-gray-950 rounded-3xl h-[100px] p-5 ml-[10px] shadow-2xl md:w-auto md:max-w-xs sm:w-[50%] "
                  />
                  <img
                    src={defaultImageURL+promoItems.Image}
                    alt="Main Image"
                    className="bg-bg-gray-100 border-3 border-gray-950 rounded-3xl h-[100px] p-5 ml-[10px] shadow-2xl md:w-auto md:max-w-xs sm:w-[50%]"
                  />
                </div>
                <div className="border-gray-950 rounded-3xl shadow-2xl p-10">
                  <h1 className="font-bold text-3xl">{promoItems.CarName}</h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col bg-gray-950">
        <h1 className="text-white p-10 text-xl font-bold">BEST PRODUCTS</h1>
        <div
          className="w-full flex justify-center items-center  bg-gray-950"
          id="Products"
        >
          <div className="w-[90%] grid grid-cols-4 gap-4">
            {items.map((item) => {
              return (
                <div className="card w-[250px] p-5 m-5 bg-white border-3 border-white rounded-3xl shadow-lg shadow-gray-400">
                  <div className="small_card">
                    <i className="fa-solid fa-heart"></i>
                    <i className="fa-solid fa-share mt-[10px]"></i>
                  </div>
                  <div className="image bg-gray-300 rounded-lg">
                    <img src={defaultImageURL+item.Image} />
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
                        onClick={() => addToCart(item.CarID)}
                        className="bg-yellow-300 p-1 rounded-lg text-[1em] font-bold"
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
        <div className="w-full flex justify-center mt-[50px] mb-[50px]">
          <Link to={"/products"}>
          <a className="border-3 bg-white p-2 rounded text-lg shadow-lg shadow-gray-400 border-white">
            {" "}
            SHOW MORE
          </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
