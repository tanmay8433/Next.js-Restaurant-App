import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "../../lib/db";
import { userSchema } from "../../lib/userModel";

export async function POST(request) {
  try {
    const payload = await request.json();
    console.log(payload);

    await mongoose.connect(connectionStr);
  // if (payload.login) {
  //     const user = await userSchema.findOne({
  //       email: payload.email,
  //       password: payload.password,
  //     });

  //     if (user) {
  //       return NextResponse.json({
  //         result: true,
  //         data: user,
  //       });
  //     } else {
  //       return NextResponse.json({
  //         result: false,
  //         message: "Invalid Email or Password",
  //       });
  //     }
  //   }
  //   const existingUser = await userSchema.findOne({
  //     email: payload.email,
  //   });

  //   if (existingUser) {
  //     return NextResponse.json({
  //       result: false,
  //       message: "Email already exists",
  //     });
  //   }
    const user = new userSchema(payload);
    const result = await user.save();

    return NextResponse.json({ result: true, data: result });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { result: false, message: error.message },
      { status: 500 }
    );
  }
}