import connectDB from "@/lib/db";
import Category from "@/models/category.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoryName = searchParams.get("name");

  try {
    await connectDB();

    let categories;
    if (categoryName) {
      categories = await Category.findOne({ name: categoryName });
    } else {
      categories = await Category.find();
    }

    if (!categories)
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );

    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(err?.message || "Something went wrong");
  }
}
