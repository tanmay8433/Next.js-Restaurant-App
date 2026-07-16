import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../../../lib/db";
import { foodSchema } from "../../../../../lib/foodModel";

export async function GET(request,{params}) {
  try {
    const {id} = await params;
    console.log(id);

    await mongoose.connect(connectionStr);
        const data = await foodSchema.findOne({
     _id: new mongoose.Types.ObjectId(id),
    });
        return NextResponse.json({ result: true, data: data });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { result: false, message: error.message },
      { status: 500 }
    );  
  }
} 


export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const payload = await request.json();

    await mongoose.connect(connectionStr);

    const updatedFood = await foodSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          name: payload.name,
          price: payload.price,
          img_path: payload.img_path,
          description: payload.description,
        },
      },
      {
        new: true, // Return the updated document
        runValidators: true,
      }
    );

    if (!updatedFood) {
      return NextResponse.json(
        {
          result: false,
          message: "Food item not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      result: true,
      message: "Food item updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    console.error("Update Error:", error);

    return NextResponse.json(
      {
        result: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}