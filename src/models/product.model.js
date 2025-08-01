const { default: mongoose, model } = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  title: String,

  description: String,

  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },

  subCategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  stock: Number,

  regularPrice: Number,

  discountPrice: Number,

  images: [String],

  sku: String,

  size: String,

  brand: String,

  warranty: String,

  status: {
    type: String,
    enum: ["In stock", "Upcoming", "Sold out"],
    default: "In stock",
  },

});

// Product Model
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
