import connectDB from "@/lib/db";
import Category from "@/models/category.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find(); // fetch from MongoDB
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(err?.message || "Something went wrong");
  }
}
