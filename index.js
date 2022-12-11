import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import oderRoutes from "./routes/order.js";
import multer from "multer";

const app = express();

import dotenv from "dotenv";
import { authenticate } from "./firebase/userHandler.js";
dotenv.config();

/*
const imagesDIR = "./uploads/images/";
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString().replace(file.originalname));
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  multer({
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
  }).single("product_main_image")
);

app.use("/products", authenticate, productRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/order", authenticate, oderRoutes);

const CONNECTION_URL = process.env.mongo_db_connection_server;
//  "mongodb+srv://zachini:ZACHINI@cluster0.1zlundx.mongodb.net/?retryWrites=true&w=majority";
//  "mongodb+srv://zachini:Zachini@cluster0.5llwsvw.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`SERVER RUNNING: ${PORT}`)));
