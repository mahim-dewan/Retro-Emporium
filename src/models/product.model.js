const { default: mongoose, model } = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category:String,
  regularPrice: Number,
  discountPrice:Number,
  image: String,
  sku:String,
  author: mongoose.Schema.ObjectId,
});

// Product Model
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
