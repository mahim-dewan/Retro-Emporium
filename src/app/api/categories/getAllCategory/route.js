import connectDB from "@/lib/db";
import Category from "@/models/category.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const categories = await Category.find();

    return NextResponse.json({ categories });
  } catch (err) {
    return NextResponse.json({ message: err?.message });
  }
}
