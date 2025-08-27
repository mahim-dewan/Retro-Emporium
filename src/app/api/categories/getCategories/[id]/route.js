// app/api/category/[id]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/category.model";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectDB();

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
