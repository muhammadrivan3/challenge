import React, { useState } from "react";
import axios from "axios";
import ImageDisplay from "./ImageDisplay";

const AddProduct = () => {
  // const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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
    const data = {
      CarID: Math.floor(Math.random() * 1000000),
      CarName: document.getElementById("name_car").value,
      DayRate: parseInt(document.getElementById("day_rate").value),
      MonthRate: parseInt(document.getElementById("month_rate").value),
      Image: selectedFile,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/cars",
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
  
  // const postData = async () => {
  //   const data = {
  //     CarID: Math.floor(Math.random() * 1000000),
  //     CarName: document.getElementById("name_car").value,
  //     DayRate: document.getElementById("day_rate").value,
  //     MonthRate: document.getElementById("month_rate").value,
  //     Image: selectedFile, // Pastikan selectedFile telah diatur sebelumnya
  //   };
  
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8081/api/v1/cars",
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           // "Origin": "http://127.0.0.1:5173",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     // Handle the server response here
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  // const postData = async () => {
  //   const formData = new FormData();
  //   const id = Math.floor(Math.random() * 1000000);
  
  //   formData.append("CarID", 1);
  //   formData.append("CarName", "ucok");
  //   formData.append("DayRate", 1);
  //   formData.append("MonthRate", 1);
  //   formData.append("Image", "a"); // Pastikan selectedFile telah diatur sebelumnya
  
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8081/api/v1/cars",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           "Origin": "http://127.0.0.1:5173",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     // Handle the server response here
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  
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
    <div className="w-full h-screen flex justify-center">
      <div className="bg-white mt-[100px] w-[80%] rounded-xl">
        <h1 className="text-center p-10 text-xl font-bold">ADD PRODUCT</h1>
        <div className="flex justify-start">
          <div className="w-[50%] ml-[30px]">
            <form>
              <div class="mb-6">
                <label
                  for="name_car"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Car Name
                </label>
                <input
                  type="text"
                  id="name_car"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="NAME"
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="day_rate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Day Rate
                </label>
                <input
                  type="number"
                  id="day_rate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="month_rate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Month Rate
                </label>
                <input
                  type="number"
                  id="month_rate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={postData}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="w-[50%] ml-[10px] flex justify-center">
            <div className="flex flex-col">
              <h2 className="mb-[10px] text-center">Upload a File</h2>
              {selectedFile ? <>
                <ImageDisplay filename={selectedFile} />
                <div className="flex justify-center p-2">
                <input class="p-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file" type="file" onChange={handleUpload}/>
             
                </div>
                
                 </> :
                  <div className="flex justify-center items-center w-full" onDrop={handleDrop}
                  onDragOver={handleDragOver}>
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" onChange={handleUpload} />
                </label>
                {/* <input
                  class="ml-[10px] mt-[10px] block w-[80%] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file"
                  type="file"
                  onChange={handleUpload}
                /> */}
              </div>}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
