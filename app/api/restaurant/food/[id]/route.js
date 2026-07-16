import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../../lib/db";
import { foodSchema } from "../../../../lib/foodModel";

export async function GET(request,{params}) {
  // const id=content.params.id
  try {
    await mongoose.connect(connectionStr);
      // console.log(id,"id")
          const { id } = await params;
    // const data = await foodSchema.find({resto_id: id,});
   const data = await foodSchema.find({
      resto_id: new mongoose.Types.ObjectId(id),
    });
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


export async function DELETE(request, { params }) {
  try {
    await mongoose.connect(connectionStr);

    const { id } = await params;

    const result = await foodSchema.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    return NextResponse.json({
      result: result.deletedCount > 0,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        result: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}