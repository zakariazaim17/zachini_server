import express from "express";

import { createUser, loginUser, signOut } from "../controllers/user.js";

const router = express.Router();

//router.get("/", getUser);

router.post("/signUp", createUser);

router.post("/login", loginUser);

router.post("/signOut", signOut);

//router.put("/:id", updateUser);

export default router;
