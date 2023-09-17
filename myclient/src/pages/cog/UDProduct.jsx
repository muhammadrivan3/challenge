import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ImageDisplay from "./ImageDisplay";
const UDProduct = () => {
  const [items, setItems] = useState([]);
  const [idUpdateItems, setidUpdateItems] = useState(null);
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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/v1/cars/${id}`)
      .then((response) => {
        // Handle successful deletion on the frontend (e.g., remove the item from the UI)
        // console.log("Item deleted successfully");
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
      })
      .catch((error) => {
        // Handle any errors from the API request
        console.error("Error deleting item:", error);
      });
  };
  // POP UP OPTIONS
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (itemId) => {
    setidUpdateItems(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang di-submit
    closeModal();
  };


  // 
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
  const updateData = async (id) => {
    const data = {
      // CarID: Math.floor(Math.random() * 1000000),
      CarName: document.getElementById("name_car").value,
      DayRate: parseInt(document.getElementById("day_rate").value),
      MonthRate: parseInt(document.getElementById("month_rate").value),
      Image: selectedFile,
    };
  
    try {
      const response = await axios.put(
        `http://localhost:8081/api/v1/cars/${id}`, // Ganti {id} dengan ID yang sesuai
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // "Origin": "http://127.0.0.1:5173", // Jika diperlukan Origin header
          },
        }
      );
      console.log(response.data);
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
      closeModal();
      // Handle the server response here
    } catch (error) {
      console.error(error);
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
    <div className="w-full h-screen flex justify-center">
      <div className="bg-white mt-[100px] w-[80%] rounded-xl">
        <h1 className="text-center p-10 text-xl font-bold">
          UPDATE & DELETE PRODUCT
        </h1>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                Car Name
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                Day Rate
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                Month Rate
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-300 divide-y divide-gray-200">
            {items.map((item) => (
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
                      <div className="text-sm leading-5 font-medium text-gray-900">
                        {item.CarName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">
                    {item.DayRate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">
                    {item.MonthRate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(item.ID)}
                      className="text-gray-300 hover:text-gray-100 bg-gray-900 p-2 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item.ID)}
                      className="text-gray-300 hover:text-red-600 bg-gray-900 p-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="flex justify-end"> 
              <button onClick={closeModal} className="bg-red-600 rounded-full h-[30px] w-[30px]"><i className="fa-solid fa-close text-white p-2"></i></button>
              </div>
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
                onClick={() => updateData(idUpdateItems)}
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
                
              </div>}
              
            </div>
          </div>
        </div>
        {/* <h2>UP</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">:</label>
            <input type="text" id="name" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button onClick={closeModal}>Close Modal</button> */}
      </Modal>
    </div>
  );
};

export default UDProduct;
