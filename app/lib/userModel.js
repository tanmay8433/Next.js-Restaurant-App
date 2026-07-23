import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  address: String,
  city: String,
  contact: String,
});
export const userSchema=mongoose.models.users 
|| mongoose.model("users",userModel);