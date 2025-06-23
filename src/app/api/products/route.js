import connectDB from "@/lib/db";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Filtering variables
    let filter = {};
    const category = searchParams.get("category");
    const minPrice = parseInt(searchParams.get("minPrice"));
    const maxPrice = searchParams.get("maxPrice");
    const maxPriceConvert =
      maxPrice === "Infinity" ? Infinity : parseInt(maxPrice);

    if (category) filter.category = category;
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filter.price = { $gte: minPrice, $lte: maxPriceConvert };
    }

    // Pagination
    const page = parseInt(searchParams.get("page") || 1);
    const limit = 20;
    const skip = (page - 1) * limit;
    // Database Connect
    await connectDB();
    // Find Products base on category, filter and limit
    const products = await Product.find(filter).skip(skip).limit(limit);
    // Intotal products
    const totalProducts = await Product.countDocuments(filter);
    // will total pages
    const totalPages = Math.ceil(totalProducts / limit);
    // send response
    return NextResponse.json({ products, totalProducts, page, totalPages });
  } catch (err) {
    return NextResponse.json({ message: err?.message });
  }
}
