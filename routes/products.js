import express from "express";
import {
  getProducts,
  getProductById,
  getProductByCategory,
  getProductByGenderAndCategory,
  getProductBybrand,
  getProductsBySubCategory,
  getProductsSale,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/singleProduct/:id", getProductById);

router.get(
  "/category/:category/:subCategory?/:brands?/:floorNumber?",
  getProductByCategory
);

router.get("/brand/:brand", getProductBybrand);

router.get("/subCategory/:subCategory", getProductsBySubCategory);

router.get("/gender/:gender/:category", getProductByGenderAndCategory);

router.get("/sale", getProductsSale);

export default router;
