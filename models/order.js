import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  buyer_id: {
    type: String,
    default: "",
  },
  product_id: {
    type: String,
    default: "",
  },
  order_image: {
    type: String,
    default: "",
  },
  order_title: {
    type: String,
    default: "",
  },
  order_price: {
    type: Number,
    default: 0,
  },
  order_date: {
    type: Number,
    default: new Date(),
  },
  order_category: {
    type: String,
    default: "",
  },
});

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;
