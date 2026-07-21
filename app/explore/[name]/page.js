"use client"
import { use, useEffect, useState } from "react";
import CustomerHeader from "../../_components/CustomerHeader"
import Footer from "../../_components/Footer"
import { useSearchParams } from "next/navigation";
const page = ({params}) => {
 const { name } = use(params); // Next.js 15

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [restaurantdetails,setRestaurantDetails]=useState();
  const [fooditems,setFoodItems]=useState([])
   
useEffect(() => {
loadrestaurantDetails()
}, [])
const dummyimg="https://static.vecteezy.com/system/resources/thumbnails/008/687/818/small_2x/food-delivery-logo-free-vector.jpg"
const loadrestaurantDetails=async()=>{

  try{
const response=await fetch(`http://localhost:3000/api/customer/${id}`);
if(!response.ok){
  throw new Error("failed to fetch restaurant details")
}
const result=await response.json();
if(result.success){
  console.log(result,"details pg result")
  setRestaurantDetails(result?.details)
  setFoodItems(result?.foodItems)
}
  }
  catch(err){
    console.log(err)
  }
}
const addToCart = (item) => {
  console.log("Added to cart:", item);

  // Later you can save it to localStorage or context
};
  return (
    <div> 
       <CustomerHeader/>
       <div className="details-page-banner">      
      <h1>{decodeURI(name)}</h1>
       <h3>{restaurantdetails?.city}</h3>
      <h3>{restaurantdetails?.contact}</h3>
      <h3>{restaurantdetails?.email}</h3>
      <h3>{restaurantdetails?.address}</h3>
      
      </div>
    <div>

 <div className="food-list">
  {fooditems?.length > 0 ? (
    fooditems.map((item, index) => (
      <div className="food-card" key={item._id || index}>
        <img
          src={item?.img_path || dummyimg}
          alt={item.name}
          className="food-image"
        />

        <div className="food-info">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <h3>₹{item.price}</h3>

          <button
            className="add-cart-btn"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="no-food">
      <h2>No Food Items Available</h2>
      <p>This restaurant hasn't added any food items yet.</p>
    </div>
  )}

</div>
    </div>
      <Footer/>
    </div>
  )
}

export default page