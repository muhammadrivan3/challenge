import axios from "axios";
import React, { useEffect, useState } from "react";
import { ferrari_portofino1 } from "../../assets";
function mergeData(data1, data2, commonKey) {
  const mergedData = [];

  for (const item1 of data1) {
    const matchingItem = data2.find(
      (item2) => item2[commonKey] === item1[commonKey]
    );

    if (matchingItem) {
      const mergedItem = { ...item1, ...matchingItem };
      mergedData.push(mergedItem);
    }
  }

  return mergedData;
}
const Cart = () => {
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [FilteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Handle date input change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const defaultImageURL = "http://localhost:8081/images/";
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from the first table
        const response1 = await axios.get(
          "http://localhost:8081/api/v1/orders"
        );

        // Fetch data from the second table
        const response2 = await axios.get("http://localhost:8081/api/v1/cars");
        const mergedData = [];

        for (const order of response1.data) {
          const matchingCar = response2.data.find(
            (car) => car.CarID === order.CarID
          );

          if (matchingCar) {
            // Merge data from both records and push it to the mergedData array
            const mergedItem = { ...order, ...matchingCar };
            mergedData.push(mergedItem);
          }
        }
        setItems(mergedData);
        console.log(mergedData);
      } catch (error) {
        console.error(error);
      }
    }

    // Call the fetchData function immediately
    fetchData();
  }, []);
  useEffect(() => {
    // Lakukan pencarian otomatis di sini berdasarkan nilai searchQuery
    const filteredItems = items.filter((item) =>
      item.CarName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }, [searchQuery, items]);
  const updateData = async () => {
    try {
      // Fetch data from the first table
      const response1 = await axios.get("http://localhost:8081/api/v1/orders");

      // Fetch data from the second table
      const response2 = await axios.get("http://localhost:8081/api/v1/cars");

      // Combine data from both responses based on a common ID ("CardID")
      const mergedData = mergeData(response1.data, response2.data, "CardID");

      // Set the merged data in your state
      setItems(mergedData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/v1/orders/${id}`)
      .then((response) => {
        // Handle successful deletion on the frontend (e.g., remove the item from the UI)
        // console.log("Item deleted successfully");
        updateData();
      });
  };
  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-950 min-h-screen">
      <div className="mt-[100px] w-[95%] rounded-xl bg-gray-800 mb-[100px]">
        <h1 className="text-center text-white p-10 text-xl font-bold ">CART</h1>
        <div className="flex justify-start items-start">
          <div className="flex flex-col">
            <form>
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-white sr-only dark:text-white"
              >
                Search Car
              </label>
              <div class="relative m-10">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-white dark:text-white"
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
            {/* <form>
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-white sr-only dark:text-white"
              >
                Search Car
              </label>
              <div class="relative m-10 mt-[-10px]">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                <input
                  className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-[#090909] focus:outline-none focus:shadow-outline"
                  id="myDate"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
            </form> */}
          </div>
          <div className="flex flex-col w-full mr-[10px]">
            {FilteredItems.map((item) => {
              // Parsing tanggal Order Date dan Drop Date
              const orderDate = new Date(item.OrderDate);
              const dropDate = new Date(item.DropoffDate);

              // Menghitung selisih hari
              const dayDiff = (dropDate - orderDate) / (1000 * 60 * 60 * 24);

              // Menentukan harga berdasarkan kondisi
              let totalPrice = 0;
              if (dayDiff < 30) {
                totalPrice = item.DayRate * dayDiff;
              } else {
                totalPrice = item.MonthRate;
              }

              return (
                <div
                  key={item.ID}
                  className="flex justify-start border-t-[3px] border-b-[3px] border-gray-950 w-full"
                >
                  <div
                    className="absolute flex justify-end items-end w-[80%] "
                  >
                    <a 
                    onClick={() => handleDelete(item.OrderID)}>
                      <i className="fa-solid fa-trash bg-red-600 p-3 rounded text-white mt-[10px]"></i>
                    </a>
                  </div>
                  <div className="p-2">
                    <img
                      src={defaultImageURL + item.Image}
                      alt=""
                      className="w-[250px]"
                    />
                  </div>
                  <div className="p-2 flex flex-col">
                    <div className="flex flex-col p-2 w-[90%]">
                      <span className="text-white font-[900] text-[1.5em]">
                        {item.CarName}
                      </span>
                      <span className="text-gray-300 text-[1em]">
                        here are the types of car types
                      </span>
                    </div>
                    <div className="grid grid-cols-6 w-full p-2">
                      <span className="text-white">DAY RATE</span>
                      <span className="text-white">:</span>
                      <span className="ml-[-90%] text-white">
                        {item.DayRate}
                      </span>
                      <span className="text-white">MONTH RATE</span>
                      <span className="text-white">:</span>
                      <span className="ml-[-90%] text-white">
                        {item.MonthRate}
                      </span>
                      <span className="text-white">ORDER DATE</span>
                      <span className="text-white"> :</span>
                      <span className="ml-[-90%] text-white">
                        {item.OrderDate.split("T")[0]}
                      </span>
                      <span className="text-white">PICK DATE</span>
                      <span className="text-white">:</span>
                      <span className="ml-[-90%] text-white">
                        {item.PickupDate.split("T")[0]}
                      </span>
                      <span className="text-white">DROP DATE</span>
                      <span className="text-white">:</span>
                      <span className="ml-[-90%] text-white">
                        {item.DropoffDate.split("T")[0]}
                      </span>
                      <span className="text-white">LOCATION </span>
                      <span className="text-white">:</span>
                      <span className="ml-[-90%] text-white">
                        {item.PickupLocation}
                      </span>
                    </div>
                    <div className="flex justify-end items-end w-full">
                      <span className="text-white font-bold text-[1.8em] text-center mr-[10px]">
                        PRICE :
                      </span>
                      <span className="text-[#ffbf00] font-bold text-[1.8em] text-center mr-[-100%]">
                        ${totalPrice.toFixed(2)}
                      </span>
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

export default Cart;
