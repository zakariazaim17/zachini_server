import express from "express";
import {
  getProducts,
  getProductById,
  updateProduct,
  getProductByCategory,
  getProductByGenderAndCategory,
  getProductBybrand,
  getProductsBySubCategory,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.get("/category/:category/:subCategory?/:brands?", getProductByCategory);

router.get("/brand/:brand", getProductBybrand);

router.get("/subCategory/:subCategory", getProductsBySubCategory);

router.get("/gender/:gender/:category", getProductByGenderAndCategory);

router.put("/:id", updateProduct);

export default router;
