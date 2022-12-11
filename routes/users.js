import express from "express";

import { createUser, loginUser, signOut } from "../controllers/user.js";
import { authenticate } from "../firebase/userHandler.js";

const router = express.Router();

//router.get("/", getUser);

router.post("/signUp", createUser);

router.post("/login", loginUser);

router.post("/signOut", authenticate, signOut);

export default router;
