import connectDB from "@/lib/db";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    await connectDB();
    const product = await Product.findById(id);

    if (!product)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid ID or server error" },
      { status: 400 }
    );
  }
}
