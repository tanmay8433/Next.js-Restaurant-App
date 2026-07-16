
import Image from 'next/image'
import { useRouter } from 'next/navigation';

import { useEffect, useReducer, useState } from 'react';


const FoodItemList = () => {
   const [foodItems,setFoodItems]=useState([]);
   const router=useRouter()
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
    const handleDeleteitem = async (id) => {
  try {
    if (!id) return;

    const response = await fetch(
      `http://localhost:3000/api/restaurant/food/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (result.result) {
      alert("Item deleted successfully");
      getFoodItems();
    } else {
      alert("Item not deleted");
    }
  } catch (error) {
    console.error("Failed to delete food item:", error);
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
              src="https://static.vecteezy.com/system/resources/thumbnails/008/687/818/small_2x/food-delivery-logo-free-vector.jpg"
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
            <button className="edit-btn" onClick={()=>router.push('dashboard/'+item._id)}>Edit</button>
            <button className="delete-btn" onClick={()=>handleDeleteitem(item._id)}>Delete</button>
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