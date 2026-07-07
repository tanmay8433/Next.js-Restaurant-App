import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "../../lib/db";
import { restaurantSchema } from "../../lib/restaurantModel";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const data = await restaurantSchema.find({});

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
export async function POST(request) {
  try {
    const payload = await request.json();
    console.log(payload);

    await mongoose.connect(connectionStr);
  if (payload.login) {
      const user = await restaurantSchema.findOne({
        email: payload.email,
        password: payload.password,
      });

      if (user) {
        return NextResponse.json({
          result: true,
          data: user,
        });
      } else {
        return NextResponse.json({
          result: false,
          message: "Invalid Email or Password",
        });
      }
    }
    const existingUser = await restaurantSchema.findOne({
      email: payload.email,
    });

    if (existingUser) {
      return NextResponse.json({
        result: false,
        message: "Email already exists",
      });
    }
    const restaurant = new restaurantSchema(payload);
    const result = await restaurant.save();

    return NextResponse.json({ result: true, data: result });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { result: false, message: error.message },
      { status: 500 }
    );
  }
}