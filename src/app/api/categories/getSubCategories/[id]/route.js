import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import SubCategory from "@/models/subCategory.model";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectDB();

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(subCategory, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
