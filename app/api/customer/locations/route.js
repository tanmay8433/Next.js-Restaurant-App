import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../../lib/restaurantModel";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const restaurants = await restaurantSchema.find({}, "city");

    const cities = [
      ...new Set(
        restaurants.map((item) =>
          item.city
            ? item.city.charAt(0).toUpperCase() + item.city.slice(1).toLowerCase()
            : ""
        )
      ),
    ].filter(Boolean);

    return NextResponse.json({
      success: true,
      result: cities,
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