const { default: mongoose, model } = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  stock: Number,
  regularPrice: Number,
  discountPrice: Number,
  image: String,
  sku: String,
  status: {
    type: String,
    enum: ["In stock", "Upcoming", "Sold out"],
    default: "In stock",
  },
  author: mongoose.Schema.ObjectId,
});

// Product Model
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
