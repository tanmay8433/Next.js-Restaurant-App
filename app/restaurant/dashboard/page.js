'use client'
import { useState } from "react";
import AddFoodItems from "../../_components/AddFoodItems"
import RestaurantHeader from "../../_components/RestaurantHeader"
import "../style.css"
import FoodItemList from "../../_components/FoodItemList";

const Dashboard = () => {
  const [addItem,setAddItem]=useState(false);
 
  
  return (
    <div> 
      <RestaurantHeader/>
      <button  className="dashboard-button" onClick={()=>setAddItem(!addItem)}>Add Food</button>
       <button   className="dashboard-button"onClick={()=>setAddItem(!addItem)}>Dashboard</button>
      
      
      {addItem?<AddFoodItems setAddItem={setAddItem} addItem={addItem}/>
:

    <FoodItemList/>
    
    }
       
      </div>
  )
}

export default Dashboard