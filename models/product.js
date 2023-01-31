import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  details: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  discount_price: {
    type: Number,
    default: 0,
    min: 0,
  },
  tags: {
    type: Array,
    default: [],
  },
  gender: {
    type: String,
    enum: ["MEN", "WOMEN"],
    default: "WOMEN",
  },
  product_main_image: {
    type: String,
    default: "",
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Number,
    default: new Date(),
  },
  // bags , clothes..
  category: {
    type: String,
    default: "",
  },
  // handBags, toteBags
  sub_category: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
  // gucci, chanel ..
  brand: {
    type: String,
    default: "",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  is_inStock: {
    type: Boolean,
    dafault: true,
  },
  is_discount_applied: {
    type: Boolean,
    default: false,
  },
  is_available_for_sale: {
    type: Boolean,
    default: false,
  },
  latest_update: {
    type: Number,
    default: new Date(),
  },
});

const Products = mongoose.model("Products", productSchema);

export default Products;
