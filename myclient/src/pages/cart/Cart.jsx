import axios from 'axios';
import React, { useEffect, useState } from 'react'

function mergeData(data1, data2, commonKey) {
    const mergedData = [];
  
    for (const item1 of data1) {
      const matchingItem = data2.find((item2) => item2[commonKey] === item1[commonKey]);
  
      if (matchingItem) {
        const mergedItem = { ...item1, ...matchingItem };
        mergedData.push(mergedItem);
      }
    }
  
    return mergedData;
  }
const Cart = () => {
  
    const [items, setItems] = useState([]);

    const defaultImageURL = "http://localhost:8081/images/"
    useEffect(() => {
        async function fetchData() {
          try {
            // Fetch data from the first table
            const response1 = await axios.get("http://localhost:8081/api/v1/orders");
        
            // Fetch data from the second table
            const response2 = await axios.get("http://localhost:8081/api/v1/cars");
        
            // Combine data from both responses based on a common ID ("CardID")
            const mergedData = mergeData(response1.data, response2.data, "CardID");
        
            // Set the merged data in your state
            console.log(mergedData)
            setItems(mergedData);
          } catch (error) {
            console.error(error);
          }
        }
        
        // Call the fetchData function immediately
        fetchData();
      }, []);
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
      }
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
      <div className='w-full h-screen flex justify-center'>
          <div className='bg-white mt-[100px] w-[80%] rounded-xl'>
              <h1 className='text-center p-10 text-xl font-bold'>CART</h1>
              <table className="min-w-full border-collapse">
        <thead>
          <tr>
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
              Order & Pick
            </th>
            <th className="px-6 py-3 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
              Pick & Drop Location
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
                  src={defaultImageURL+item.Image} // Provide the image source URL
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
                <div className="text-sm leading-5 text-gray-900">{item.DayRate}</div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">{item.MonthRate}</div>
              </td>
              
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">{item.PickupLocation.split('T')[0]} - {item.OrderDate.split('T')[0]}</div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">{item.PickupLocation} - {item.DropoffLocation.split('T')[0]}</div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex space-x-2">
                  
                  <button
                    onClick={() => handleDelete(item.OrderID)}
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
      </div>
    )
}

export default Cart