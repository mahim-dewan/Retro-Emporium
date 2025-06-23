const { default: mongoose, model } = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  author: mongoose.Schema.ObjectId,
});

// Product Model
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
