
import Image from 'next/image'
import { useEffect, useState } from 'react';


const FoodItemList = () => {
   const [foodItems,setFoodItems]=useState([]);
   const getFoodItems = async () => {
      try {
        const restaurantUser = JSON.parse(
          localStorage.getItem("restaurantUser")
        );

        if (!restaurantUser?._id) return;

        const response = await fetch(
          `http://localhost:3000/api/restaurant/food/${restaurantUser._id}`
        );

        const result = await response.json();

        if (result?.result) {
          setFoodItems(result?.data);
        } else {
          setFoodItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch food items:", error);
      }
    };
  useEffect(() => {
    getFoodItems();
  }, []);
  return (
    <div className="food-table-container">
      <h1>Food Items</h1>
  <table className="food-table">
    <thead>
      <tr>
        <th>S.NO</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Operations</th>
      </tr>
    </thead>

    <tbody>
      {foodItems?.map((item,index) => (
        <tr key={item._id}>
          <td>{index+1}</td>
          <td>
            <Image
              src={item?.img_path || "/no-image.png"}
              alt={item?.name || "Food"}
              width={80}
              height={80}
              className="food-image"
            />
          </td>

          <td>{item?.name}</td>

          <td>₹ {item?.price}</td>

          <td>{item?.description}</td>

          <td>
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {foodItems?.length === 0 && (
    <h3 style={{ textAlign: "center", marginTop: "20px" }}>
      No Food Items Found
    </h3>
  )}
  </div>
  )
}

export default FoodItemList