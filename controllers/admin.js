import { uploadImage } from "../firebase/storageHandler.js";
import {
  login,
  signUp,
  signout,
  authenticate,
} from "../firebase/userHandler.js";
import Admin from "../models/admin.js";
import Products from "../models/product.js";

export const createAdmin = async (req, res) => {
  const body = req.body;

  const adminEmail = body.email.toLowerCase();
  const adminPassword = body.password;

  try {
    const newAdmin = await signUp(adminEmail, adminPassword);

    console.log("new Admin", newAdmin);

    const newAdminToDb = new Admin({
      ...body,
    });

    await newAdminToDb.save();

    res.status(201).json({
      clientToken: newAdmin.stsTokenManager.accessToken,
      clientId: newAdminToDb._id,
      clientName: newAdminToDb.name,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json(e.code);
  }
};

export const getAdminById = async (req, res) => {
  const userId = req.body.id;

  try {
    const admin = await Admin.find({
      _id: userId,
    });
    res.status(200).json(admin);
  } catch (e) {
    console.log("error", e);
    res.status(500).json("Could not get admin information");
  }
};

export const loginAdmin = async (req, res) => {
  const adminEmail = req.body.email.toLowerCase();
  const adminPassword = req.body.password;

  try {
    const getAdminFromDb = await Admin.find({
      email: adminEmail,
    });

    if (getAdminFromDb.length > 0) {
      const logedInAdmin = await login(adminEmail, adminPassword);

      console.log("loged IN USER", logedInAdmin);
      res.status(200).json({
        clientToken: logedInAdmin.stsTokenManager.accessToken,
        clientId: getAdminFromDb[0]._id,
        clientName: getAdminFromDb[0].name,
      });
    } else {
      return res.status(500).json("Admin does not exist");
    }
  } catch (e) {
    console.log("Error121212", e);
    return res.status(500).json(e.code);
  }
};

export const signOut = async (req, res) => {
  try {
    signout();
    res.status(201).send("user is logedOut");
  } catch (e) {
    console.log("ERORR", e);
    return res.status(500).json(e.code);
  }
};

// Create new product is permitted only from admins side
export const createProduct = async (req, res) => {
  const body = req.body;
  const image = req.file;
  console.log("M;M;M;M;M;M", image);

  await authenticate(req, res, async () => {
    try {
      const uploadedImageUrl = await uploadImage(image);

      const newProduct = new Products({
        ...req.body,
        category: req.body.category.toUpperCase(),
        sub_category: req.body.sub_category.toUpperCase(),
        branb: req.body.brand.toUpperCase(),
        product_main_image: uploadedImageUrl,
      });

      await newProduct.save();
      res.status(200).send(newProduct);
    } catch (e) {
      console.log("error", e);
      res.status(500).send("could not create new product");
    }
  });
};

// modify product by id
export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  delete productData._id;
  productData.latest_update = new Date();

  console.log("will update", productData);
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      productData
    );
    return res.status(200).send(updatedProduct);
  } catch (e) {
    console.log("error", e);
    return res.status(500).send("problem occured while updating product");
  }
};
