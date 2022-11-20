import express from "express";

import {
  createAdmin,
  createProduct,
  loginAdmin,
  signOut,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/signUp", createAdmin);

router.post("/login", loginAdmin);

router.post("/signOut", signOut);

router.post("/newProduct", createProduct);

export default router;
