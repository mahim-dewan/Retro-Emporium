import connectDB from "@/lib/db";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const products = await Product.find().limit(20);
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json(
      { message: err?.message } || "Something went wrong"
    );
  }
}
