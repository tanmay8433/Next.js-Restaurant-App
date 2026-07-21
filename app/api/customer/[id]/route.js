import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";
import { restaurantSchema } from "../../../lib/restaurantModel";
import { foodSchema } from "../../../lib/foodModel";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await mongoose.connect(connectionStr);
// findOne({ _id: id });
    const details = await restaurantSchema.findOne({ _id: id });
    const foodItems = await foodSchema.find({ resto_id: id });

    return NextResponse.json({
      success: true,
      details,
      foodItems,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}