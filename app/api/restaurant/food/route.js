import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../lib/db";
import { foodSchema } from "../../../lib/foodModel";

export async function POST(request) {
  try {
    const payload = await request.json();
    console.log(payload);

    await mongoose.connect(connectionStr);
  
    const food = new foodSchema(payload);
    const result = await food.save();

    return NextResponse.json({ result: true, data: result });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { result: false, message: error.message },
      { status: 500 }
    );  
  }
}