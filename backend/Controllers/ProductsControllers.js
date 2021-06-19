import Product from "../Models/productModel.js";
import asyncHandler from "express-async-handler";
import path from "path";
import _ from "lodash";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = path.resolve();

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

const uploadProductImage = asyncHandler(async (req, res) => {
  let image = req.body.data;

  const cloudres = await cloudinary.v2.uploader.upload(image, {
    upload_preset: "Emporium_APP",
    folder: "EmporiumApplication/Products/",
    transformation: [{ width: 450, height: 450, crop: "fit" }],
  });

  res.status(200);
  res.json({ filePath: cloudres.url });

  // image.name = Date.now() + "emporium_products" + path.extname(image.name);

  // console.log(image);
  // image.mv(`${__dirname}/Uploads/${image.name}`, (err) => {
  //   if (err) {
  //     res.status(500).send(err);
  //     console.log(err);
  //   }

  //   res.status(200);
  //   res.json({ filePath: `/Uploads/${image.name}` });
  // });

  // let image = req.body.image;
  // console.log(image);
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
  uploadProductImage,
  deleteProducts,
  getProductsByCategories,
};
