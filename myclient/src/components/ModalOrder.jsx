import React, { useState } from "react";
import Modal from "react-modal";
import { masterd_card, visa_card } from "../assets";
import axios from "axios";

const ModalOrder = ({ isOpen, onClose, dataID, setData }) => {
    
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDatePick, setselectedDatePick] = useState("");
  const [selectedDateDrop, setselectedDateDrop] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "1px solid #ccc",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    },
  };
  const onOrder = async () => {
    if (new Date(selectedDate) <= new Date(selectedDatePick)) {
        // Tanggal pesanan valid, lanjutkan dengan proses pemesanan
        // ...kode pemesanan Anda...
        if (new Date(selectedDatePick) <= new Date(selectedDateDrop)) {
            const data = {
                OrderID: Math.floor(Math.random() * 1000000),
                CarID: dataID,
                OrderDate: selectedDate,
                PickupDate: selectedDatePick,
                DropoffDate: selectedDateDrop,
                PickupLocation: "JAKARTA",
                DropoffLocation: "JAKARTA",
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
                // console.log(response.data);
                onClose();
                // Handle the server response here
              } catch (error) {
                console.error(error);
              }
        }else{
            
            seterrorMessage("ERROR : the pick date cannot be later than the drop date")
        }
      }else{
        seterrorMessage("ERROR : the order date cannot be later than the pick date")
      }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      style={customStyles}
    >
      {/* <h2>Contoh Modal</h2> */}
      <div className="inset-0 flex flex-col w-full">
        <div className="flex justify-end absolute w-[95%]">
          <button
            onClick={onClose}
            style={customStyles.closeButton}
            className="bg-red-600 rounded-full flex justify-center items-center w-[30px] h-[30px]"
          >
            <i className="fa-solid fa-close text-white"></i>
          </button>
        </div>
        <div>
          <span className="text-[1.5em] font-[600] ">ORDER YOUR DREAM CAR</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div class=" w-full">
            <label
              htmlFor="datepicker"
              className="block text-gray-700 font-bold"
            >
              ORDER DATE
            </label>
            <input
              type="date"
              id="datepicker"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <p>ORDER DATE: {selectedDate}</p>
          </div>
          <div class=" w-full">
            <label
              htmlFor="datepicker"
              className="block text-gray-700 font-bold"
            >
              PICKUP DATE
            </label>
            <input
              type="date"
              id="datepicker"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
              value={selectedDatePick}
              onChange={(e) => setselectedDatePick(e.target.value)}
            />
            <p>PICK DATE: {selectedDatePick}</p>
          </div>
          <div class=" w-full">
            <label
              htmlFor="datepicker"
              className="block text-gray-700 font-bold"
            >
              DROPOFF DATE
            </label>
            <input
              type="date"
              id="datepicker"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
              value={selectedDateDrop}
              onChange={(e) => setselectedDateDrop(e.target.value)}
            />
            <p>DROP DATE: {selectedDateDrop}</p>
          </div>
          
        </div>
        <div className="flex justify-center items-center">
          <div className="rounded-xl shadow-xl p-5 w-[200px] h-[150px] m-5">
            <img src={masterd_card} alt="" />
          </div>
          <div className="rounded-xl shadow-xl p-5 w-[200px] h-[150px] text-center m-5">
            <img src={visa_card} alt="" className="text-center mt-[10%]" />
          </div>
        </div>
        <div className="text-red-600 flex justify-center items-center"><span>{errorMessage}</span></div>
        <button
          className="bg-green-600 rounded border-2 border-green-600 p-2 text-white font-[900]"
          onClick={onOrder}
        >
          ORDER
        </button>
      </div>
    </Modal>
  );
};

export default ModalOrder;
