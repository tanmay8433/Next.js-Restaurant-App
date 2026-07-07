import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  address: String,
  city: String,
  contact: String,
});
export const restaurantSchema=mongoose.models.restaurants 
|| mongoose.model("restaurants",restaurantModel);