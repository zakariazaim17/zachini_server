import Products from "../models/product.js";
import { uploadImage } from "../firebase/storageHandler.js";

// get all products from the API
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.send(products);
  } catch (e) {
    console.log(error, e);
  }
};

// get product by the id from the API
export const getProductById = async (req, res) => {
  const productId = req.params.id;

  console.log("PARAMS forwarded", req.params);

  try {
    const fetchedProduct = await Products.find({ _id: req.params.id });
    res.send(fetchedProduct);
  } catch (e) {
    console.log("error", e);
  }
};

// get product by category

export const getProductByCategory = async (req, res) => {
  const productCategory = req.params.category.toUpperCase();
  const subCategory = req.params.subCategory;
  const productBrand = req.params.category.brands;

  console.log("PARAMS forwarded", subCategory);

  console.log("passs", request);
  try {
    const fetchedProductsByCategory = await Products.aggregate([
      {
        $match: {
          $and: [
            { category: productCategory },
            { sub_category: subCategory },
            { brand: productBrand },
          ],
        },
      },
    ]);
    res.send(fetchedProductsByCategory);
  } catch (e) {
    console.log("error", e);
  }
};

// get product by brand
export const getProductBybrand = async (req, res) => {
  const productBrand = req.params.brand.toUpperCase();

  console.log("PARAMS forwarded", productBrand);

  try {
    const fetchedProducts = await Products.find({
      brand: productBrand,
    });
    res.send(fetchedProducts);
  } catch (e) {
    console.log("error", e);
  }
};

// get product by gender and category
export const getProductByGenderAndCategory = async (req, res) => {
  const productGender = req.params.gender.toUpperCase();
  const productCategory = req.params.category.toUpperCase();

  console.log("PARAMS forwarded", productGender, productCategory, req.params);

  try {
    const fetchedProducts = await Products.find({
      gender: productGender,
      category: productCategory,
    });
    res.send(fetchedProducts);
  } catch (e) {
    console.log("error", e);
  }
};

// Create new product (push image to Firebase and append the URL link to new product )
export const createProduct = async (req, res) => {
  const body = req.body;
  const image = req.file;
  console.log("M;M;M;M;M;M", image);

  try {
    const uploadedImageUrl = await uploadImage(image);

    const newProduct = new Products({
      ...req.body,
      product_main_image: uploadedImageUrl,
    });

    await newProduct.save();
    res.send(newProduct);
  } catch (e) {
    console.log("error", e);
  }
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
    res.send(updatedProduct);
  } catch (e) {
    console.log("error", e);
  }
};
