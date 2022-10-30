import express from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  getProductByCategory,
  getProductByGenderAndCategory,
  getProductBybrand,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.get("/category/:category/:subCategory?/:brands?", getProductByCategory);

router.get("/brand/:brand", getProductBybrand);

router.get("/gender/:gender/:category", getProductByGenderAndCategory);

router.get;

router.post("/", createProduct);

router.put("/:id", updateProduct);

export default router;
