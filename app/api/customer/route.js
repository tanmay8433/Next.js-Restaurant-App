import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../lib/db";
import { restaurantSchema } from "../../lib/restaurantModel";

// export async function GET(request) {
//   try {
//     const queryParams = request.nextUrl.searchParams;

//     let filter = {};

//     if (queryParams.get("location")) {
//       const city = queryParams.get("location");

//       filter = {
//         city: {
//           $regex: new RegExp(city, "i"),
//         },
//       };
//     }
// else if(queryParams.get("restaurant")){
//     // const name = queryParams.get("restaurant");
//  const name = queryParams.get("restaurant").trim();
//       filter = {
//         name: {
//           // $regex: new RegExp(name, "i"),
//            $regex: new RegExp(`^${name}$`, "i"),
//         },
//       };
// }
//     await mongoose.connect(connectionStr);

//     const result = await restaurantSchema.find(filter);

//     return NextResponse.json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.error("Error fetching restaurants:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch restaurants",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
export async function GET(request) {
  try {
    const queryParams = request.nextUrl.searchParams;

    const location = queryParams.get("location");
    const restaurant = queryParams.get("restaurant");

    let filter = {};

    // Filter by location
    if (location) {
      filter.city = {
        $regex: new RegExp(location, "i"),
      };
    }

    // Filter by restaurant
    if (restaurant) {
      filter.name = {
        $regex: new RegExp(`^${restaurant}$`, "i"),
      };
    }

    await mongoose.connect(connectionStr);

    const result = await restaurantSchema.find(filter);

    return NextResponse.json({
      success: true,
      result,
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
