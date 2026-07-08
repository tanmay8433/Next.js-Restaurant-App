import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../../lib/db";
import { foodSchema } from "../../../../lib/foodModel";

export async function GET(request,content) {
  const id=content.params.id
  try {
    await mongoose.connect(connectionStr);

    const data = await foodSchema.find({resto_id:id});

    return NextResponse.json({
      result: true,
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        result: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}