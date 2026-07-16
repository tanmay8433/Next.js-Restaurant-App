"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItems = () => {
 const {id}=  useParams()
  console.log(id)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [Error, setError] = useState(false);
  const router=useRouter()

useEffect (() => {
handleLoadFoodItem()
}, [])
const handleLoadFoodItem = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/restaurant/food/edit/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch food item.");
    }

    const result = await response.json();

    if (result.result) {
      console.log(result,"editpage");

      // Optional: populate the form  
      setName(result.data.name);
      setPrice(result.data.price);
      setPath(result.data.img_path);
      setDescription(result.data.description);
    } else {
      console.log(result.message || "Food item not found.");
    }
  } catch (error) {
    console.error("Error loading food item:", error);
  }
};
  const editfoodItem = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/restaurant/food/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          img_path: path,
          description,
        }),
      }
    );

    const result = await response.json();

    console.log(result);

    if (result.result) {
      alert("Food item updated successfully!");
      router.push("/restaurant/dashboard");
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};

    const handleEditfood = () => {
      // Reset errors
      setError(false);

  if (
      !name.trim() ||
      !price || 
      !path.trim() ||
      !description.trim()
    ){
      setError(true)
      return;
    }


      editfoodItem();
    };

  return (
    <div className="container">
      <h1> Update Food Items</h1>

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
        <button className="button" onClick={handleEditfood}>
          Update Food
        </button>
      </div>
           <div className="input-wrapper">
        <button className="button" onClick={()=>router.push('../dashboard')}>
       Back to Food items
        </button>
      </div>
    </div>
  );
};

export default EditFoodItems;