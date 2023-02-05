import express from "express";

import {
  createAdmin,
  createProduct,
  getAdminById,
  loginAdmin,
  signOut,
  updateProduct,
} from "../controllers/admin.js";
import { authenticate } from "../firebase/userHandler.js";

const router = express.Router();

router.get("/", getAdminById);

router.post("/signUp", createAdmin);

router.post("/login", loginAdmin);

router.post("/signOut", signOut);

router.post("/newProduct", authenticate, createProduct);

router.put("/:id", authenticate, updateProduct);

export default router;
