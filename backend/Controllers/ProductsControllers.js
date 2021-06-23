import Product from "../Models/productModel.js";
import asyncHandler from "express-async-handler";
import path from "path";
import _ from "lodash";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const getLatestProducts = asyncHandler(async (req, res) => {
  const latestProducts = await Product.find({})
    .sort({ createdAt: "descending" })
    .limit(6);

  res.json(latestProducts);
});

const getProductDetails = asyncHandler(async (req, res) => {
  const product_id = req.params.id;
  const productDetails = await Product.findById(product_id);

  res.json(productDetails);
});

const getCloudinaryProfile = asyncHandler(async (req, res) => {
  const cloudName = process.env.CLOUDINARY_NAME;

  res.status(200);
  res.json({ cloudName });
});

const getCloudinarySign = asyncHandler(async (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  const api_key = process.env.CLOUDINARY_API_KEY;

  res.status(200);
  res.json({ signature, timestamp, api_key });
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    countInStock,
    brand,
    category,
    image,
    price,
  } = req.body;

  const newProduct = await Product.create({
    name,
    description,
    stockCount: countInStock,
    brand,
    category,
    image,
    price,
  });

  if (newProduct) {
    res.status(201);
    res.json(newProduct);
  } else {
    res.status(400);
    res.json({ msg: "Server Error!" });
  }
});

const deleteProducts = asyncHandler(async (req, res) => {
  const ids = req.body;

  const deletedProducts = await Product.deleteMany({ _id: { $in: ids } });

  if (deleteProducts) {
    res.status(204);
    res.json({ message: "Products deleted successfully!" });
  } else {
    res.status(500);
    res.json({ message: "Server Error!" });
  }
});

const getProductsByCategories = asyncHandler(async (req, res) => {
  const category = req.params.category;

  const products = await Product.find({
    category,
  });

  console.log(category);
  res.status(200);
  res.json(products);
});

export {
  getLatestProducts,
  getProductDetails,
  createProduct,
  deleteProducts,
  getProductsByCategories,
  getCloudinarySign,
  getCloudinaryProfile,
};
