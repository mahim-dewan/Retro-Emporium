import connectDB from "@/lib/db";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

// Get Products
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Filtering variables
    let filter = {};
    const category_id = searchParams.get("category_id");
    const min_price = Number(searchParams.get("min_price"));
    const max_price = Number(searchParams.get("max_price"));
    const max_priceConvert =
      max_price === "Infinity" ? Infinity : Number(max_price);

    // ✅ Only check category if category_id is given
    if (category_id) {
      const category = await Category.findById(category_id);
      if (!category) {
        return NextResponse.json(
          { message: "Invalid category" },
          { status: 404 }
        );
      }
      filter.category_id = category_id;
    }

    if (
      !isNaN(min_price) &&
      !isNaN(max_price) &&
      (min_price || max_price > 0)
    ) {
      filter.discountPrice = { $gte: min_price, $lte: max_priceConvert };
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

    return NextResponse.json({ message: "Product Deleted" });
  } catch (err) {
    return NextResponse.json({
      message: err?.message || "Something went wrong",
    });
  }
}
