import Products from "../models/product.js";

// get all products from the API
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (e) {
    console.log(error, e);
    res.status(500).json("could not get products");
  }
};

// get product by the id from the API
export const getProductById = async (req, res) => {
  const productId = req.params.id;

  console.log("PARAMS forwarded", req.params);

  try {
    const fetchedProduct = await Products.find({ _id: req.params.id });
    res.status(200).json(fetchedProduct);
  } catch (e) {
    console.log("error", e);
    res.status(500).json("could not get product by id");
  }
};

// get product by category
export const getProductByCategory = async (req, res) => {
  const productCategory = req.params.category.toUpperCase();
  const subCategory = req.params.subCategory?.toUpperCase();
  const productBrand = req.params.brands?.toUpperCase();
  const floorNumber = req.params?.floorNumber;

  console.log("PARAMS forwarded", productCategory, subCategory, productBrand);

  try {
    const filterConditions = [{ category: productCategory }];
    if (subCategory && subCategory !== "NULL") {
      filterConditions.push({
        sub_category: subCategory,
      });
    }
    if (productBrand && productBrand !== "NULL") {
      filterConditions.push({
        brand: productBrand,
      });
    }

    let filteredProducts = [
      {
        $match: {
          $and: filterConditions,
        },
      },
    ];

    if (floorNumber) {
      filteredProducts.push({ $sample: { size: Number(floorNumber) } });
    }

    const fetchedProductsByCategory = await Products.aggregate(
      filteredProducts
    );
    res.status(200).json(fetchedProductsByCategory);
  } catch (e) {
    console.log("error", e);
    res.status(500).json("could not get products by category");
  }
};

// get product by brand
export const getProductBybrand = async (req, res) => {
  try {
    const fetchedProducts = await Products.find({
      brand: req.params.brand.toUpperCase(),
    });
    res.status(200).json(fetchedProducts);
  } catch (e) {
    console.log("error", e);
    res.status(500).json("could not get products by brand");
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
  console.log("PARAMS forwarded", productSubCategory);

  try {
    const fetchedProducts = await Products.find({
      sub_category: req.params.subCategory,
    });
    res.status(200).send(fetchedProducts);
  } catch (e) {
    console.log("error", e);
    res.status(500).send("could not get products by sub category");
  }
};

export const getProductsSale = async (req, res) => {
  try {
    const fetchedProducts = await Products.find({
      is_available_for_sale: true,
    });
    res.status(200).send(fetchedProducts);
  } catch (e) {
    console.log("error", e);
    res.status(500).send("could not get products in sale");
  }
};
