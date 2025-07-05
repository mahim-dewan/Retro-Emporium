import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { firstname, lastname, email, password } = await req.json();

    // Connect Database
    await connectDB();

    // Check user exists
    const isExists = await User.findOne({ email });
    if (isExists)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );

    // create a new user
    const user = new User({ firstname, lastname, email, password });
    const data = await user.save();

    // send response
    return NextResponse.json(
      {
        message: "User created successfully",
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          role: data.role,
          isVerified: data.isVerified,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: err?.message }, { status: 400 });
  }
}
