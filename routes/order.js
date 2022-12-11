import express from "express";
import {
  createOrder,
  getOrdersByBuyerId,
  getOrdersByCategory,
  getOrdersByPurchase_date,
} from "../controllers/order.js";

const router = express.Router();

router.get("/:buyer_id", getOrdersByBuyerId);

router.get("/category/:buyer_id/:order_category", getOrdersByCategory);

router.get("/purchaseDate/:buyer_id/:order_date", getOrdersByPurchase_date);

router.post("/create", createOrder);

export default router;
