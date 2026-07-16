"use client";
// import { useRouter } from "next/navigation";
import { useState } from "react";

const AddFoodItems = ({setAddItem,addItem}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");

  const [Error, setError] = useState(false);
// const router=useRouter()
  const addfoodItem = async () => {
    const restaurantUser = JSON.parse(localStorage.getItem("restaurantUser"));

    if (!restaurantUser?._id) {
      alert("Restaurant user not found. Please login again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/restaurant/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          img_path: path,
          description,
          resto_id: restaurantUser._id,
        }),
      });

      const result = await response.json();

      if (result?.result) {
        alert("Food item added successfully!");

        // router.push("/restaurant/dashboard")
        // Clear form
        setName("");
        setPrice("");
        setPath("");
        setDescription("");
        setAddItem(!addItem)
      } else {
        alert(result?.message || "Failed to add food item.");
      }
    } catch (err) {
      console.error("Add food item failed:", err);
    }
  };

  const handleAddfood = () => {
    // Reset errors
    setError(false);

 if (
    !name.trim() ||
    !price.trim() ||
    !path.trim() ||
    !description.trim()
  ){
    setError(true)
    return;
  }


    addfoodItem();
  };

  return (
    <div className="container">
      <h1>Add New Food Items</h1>

      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter the food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {Error && !name &&<span className="input-error">Food name is required.</span>}
      </div>

      <div className="input-wrapper">
        <input
          type="number"
          className="input-field"
          placeholder="Enter the food price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {Error && !price &&<span className="input-error">Food price is required.</span>}
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter the food image path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {Error && !path &&<span className="input-error">Image path is required.</span>}
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter the food description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {Error && !description && (
          <span className="input-error">Description is required.</span>
        )}
      </div>

      <div className="input-wrapper">
        <button className="button" onClick={handleAddfood}>
          Add Food
        </button>
      </div>
    </div>
  );
};

export default AddFoodItems;