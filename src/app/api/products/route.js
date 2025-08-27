import connectDB from "@/lib/db";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

// Get Products
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

// Create a new Product
export async function POST(req) {
  await connectDB(); // connect to MongoDB

  try {
    const product = await req.json();

    // Create the product in the database
    const newProduct = new Product(product); // Create new Product instance
    await newProduct.save(); // Save to DB

    return NextResponse.json(
      { newProduct, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

// Update a product
export async function PUT(req) {
  await connectDB(); // Database connect
  try {
    const updatedProduct = await req.json(); // product obj from frontend

    const result = await Product.findByIdAndUpdate(
      { _id: updatedProduct._id },
      updatedProduct
    );

    if (!result)
      return NextResponse.json(
        { message: "Failed to update" },
        { status: 204 }
      );

    return NextResponse.json({
      message: "Updated successfully",
      product: result,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: err?.message || "Something went wrong",
      },
      { status: 400 }
    );
  }
}

// Delete a Product
export async function DELETE(req) {
  try {
    const id = await req.json();
    const result = await Product.findByIdAndDelete(id);
    console.log(result);

    return NextResponse.json({ message: "Product Deleted" });
  } catch (err) {
    return NextResponse.json({
      message: err?.message || "Something went wrong",
    });
  }
}
