import connectDB from "@/lib/db";
import SubCategory from "@/models/subCategory.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    console.log("db connected");

    const subCategories = await SubCategory.find(); // fetch from MongoDB

    return NextResponse.json(subCategories);
  } catch (err) {
    return NextResponse.json(err?.message || "Something went wrong");
  }
}
