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
  const subCategory = req.params.subCategory?.toUpperCase();
  const productBrand = req.params.brands?.toUpperCase();

  console.log("PARAMS forwarded", productCategory, subCategory, productBrand);

  try {
    const filterConditions = [{ category: productCategory }];
    if (subCategory) {
      filterConditions.push({
        sub_category: subCategory,
      });
    }
    if (productBrand) {
      filterConditions.push({
        brand: productBrand,
      });
    }

    const filteredProducts = [
      {
        $match: {
          $and: filterConditions,
        },
      },
    ];

    const fetchedProductsByCategory = await Products.aggregate(
      filteredProducts
    );
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

// get products by subCategories

export const getProductsBySubCategory = async (req, res) => {
  const productSubCategory = req.params.subCategory.toUpperCase();

  console.log("PARAMS forwarded", productSubCategory);

  try {
    const fetchedProducts = await Products.find({
      sub_category: productSubCategory,
    });
    res.status(200).send(fetchedProducts);
  } catch (e) {
    console.log("error", e);
    res.status(500).send("could not get products by sub category");
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
    res.status(200).send(newProduct);
  } catch (e) {
    console.log("error", e);
    res.status(500).send("could not create new product");
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
    res.status(200).send(updatedProduct);
  } catch (e) {
    console.log("error", e);
    res.status(500).send("problem occured while updating product");
  }
};
