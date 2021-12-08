import Product from "../Models/productModel.js";
import asyncHandler from "express-async-handler";
import path from "path";
import _ from "lodash";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import Sale from "../Models/saleModel.js";
import { getRunningSale } from "./SalesControllers.js";

dotenv.config();

const getLatestProducts = asyncHandler(async (req, res) => {
  let latestProducts = await Product.find({})
    .populate({ path: "saleId", select: "discountPrecentage" })
    .sort({ createdAt: "descending" })
    .limit(8);

  const runningSale = await getRunningSale();

  if (runningSale) {
    latestProducts = latestProducts.map((product) => {
      return {
        ...product.toObject(),
        discountedPrice: (
          product.price -
          (product.price * runningSale.discountPrecentage) / 100
        ).toFixed(2),
      };
    });
  }

  res.status(200);
  res.json(latestProducts);
});

const getProductDetails = asyncHandler(async (req, res) => {
  const product_id = req.params.id;
  let productDetails = await Product.findById(product_id);

  const runningSale = await getRunningSale();

  if (runningSale) {
    productDetails = {
      ...productDetails.toObject(),
      discountedPrice: (
        productDetails.price -
        (productDetails.price * runningSale.discountPrecentage) / 100
      ).toFixed(2),
    };
  }

  res.status(200);
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
  const { name, description, countInStock, brand, category, image, price } =
    req.body;

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
  const pageSize = 12;
  const page = Number(req.query.page) || 1;

  const productsCounts = await Product.countDocuments({ category });
  let products = await Product.find({
    category,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  const runningSale = await getRunningSale();

  if (runningSale) {
    products = products.map((product) => {
      return {
        ...product.toObject(),
        discountedPrice: (
          product.price -
          (product.price * runningSale.discountPrecentage) / 100
        ).toFixed(2),
      };
    });
  }

  res.status(200);
  res.json({ products, page, pages: Math.ceil(productsCounts / pageSize) });
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
