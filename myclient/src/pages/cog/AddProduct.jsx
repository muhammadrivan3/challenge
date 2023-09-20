import React, { useRef, useState } from "react";
import axios from "axios";
import ImageDisplay from "./ImageDisplay";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
const AddProduct = () => {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [AnimatedMessage, setAnimatedMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleAnimationComplete = () => {
    setIsVisible(false);
  };
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await axios
      .post("http://localhost:8081/api/v1/image", formData)
      .then((response) => {
        console.log(response.data);
        setSelectedFile(e.target.files[0].name);
        // Handle the server response here
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const postData = async () => {
    event.preventDefault();
    if (
      parseInt(document.getElementById("day_rate").value) <=
      parseInt(document.getElementById("month_rate").value)
    ) {
      const data = {
        CarID: Math.floor(Math.random() * 1000000),
        CarName: document.getElementById("name_car").value,
        DayRate: parseInt(document.getElementById("day_rate").value),
        MonthRate: parseInt(document.getElementById("month_rate").value),
        Image: selectedFile,
      };

      try {
        axios
          .post("http://localhost:8081/api/v1/cars", data, {
            headers: {
              "Content-Type": "application/json",
              // "Origin": "http://127.0.0.1:5173", // Jika diperlukan Origin header
            },
          })
          .then((e) => {
            (document.getElementById("name_car").value = ""),
              (document.getElementById("day_rate").value = ""),
              (document.getElementById("month_rate").value = ""),
              setSelectedFile(""),
              setAnimatedMessage("Added Successfully"),
              setIsVisible(true)
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      seterrorMessage("ERROR : daily rate cannot be more than monthly rate.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleUpload({ target: { files: [droppedFile] } });
      // setSelectedFile(droppedFile.name)
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full flex justify-center">
      <div className="h-[50px] absolute w-full left-0 right-0  flex justify-end overflow-hidden">
      {isVisible && (<motion.div
          ref={ref1}
          initial={{ x: 300 }} // Nilai awal x dan y sesuaikan dengan posisi elemen yang diinginkan
          animate={{ x: -0}}
          transition={{ type: "spring", duration: 3 }}
          className="bg-white rounded p-2 flex justify-end absolute z-20"
          onAnimationComplete={handleAnimationComplete}
        >
          <div className="rounded-full border-2 border-green-500 p-2 w-[25px] h-[25px] flex justify-center items-center">
            <i className="fa-solid fa-check text-green-500"></i>
          </div>
          <span className="text-black p-1">{AnimatedMessage}</span>
        </motion.div>)}
      </div>
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="bg-[#131313] mt-5 w-[90%] rounded-xl"
      >
        <div>
          <h1 className="text-center p-10 text-xl font-bold text-white">
            ADD PRODUCT
          </h1>
          <div className="flex justify-start">
            <div className="w-[50%] ml-[30px]">
              <form>
                <div class="mb-6">
                  <label
                    for="name_car"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Car Name
                  </label>
                  <input
                    type="text"
                    id="name_car"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1c1c1e] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="NAME"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="day_rate"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Day Rate
                  </label>
                  <input
                    type="number"
                    id="day_rate"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1c1c1e] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="month_rate"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Month Rate
                  </label>
                  <input
                    type="number"
                    id="month_rate"
                    class="bg-[#1c1c1e] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#1c1c1e] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
                    required
                  />
                </div>
                <input
                  type="text"
                  className="hidden"
                  value={selectedFile}
                  id="image_up"
                />
                {errorMessage === "" ? null : (
                  <div className="text-red-600">
                    <span>{errorMessage}</span>
                  </div>
                )}
                <button
                  type="submit"
                  class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={postData}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="w-[50%] ml-[10px] flex justify-center">
              <div className="flex flex-col">
                <h2 className="mb-[10px] text-center text-white">
                  Upload a File
                </h2>
                {selectedFile ? (
                  <>
                    <ImageDisplay filename={selectedFile} />
                    <div className="flex justify-center p-2">
                      <input
                        className="p-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#1c1c1e] dark:text-gray-400 focus:outline-none dark:bg-[#1c1c1e] dark:border-gray-600 dark:placeholder-gray-400"
                        id="file"
                        type="file"
                        onChange={handleUpload}
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className="flex justify-center items-center w-full"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <label
                      for="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-[#1c1c1e] dark:bg-[#1c1c1e] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-white">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        onChange={handleUpload}
                      />
                    </label>
                    {/* <input
                  class="ml-[10px] mt-[10px] block w-[80%] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file"
                  type="file"
                  onChange={handleUpload}
                /> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProduct;
