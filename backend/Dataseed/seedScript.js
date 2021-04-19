import products from "./products.js";
import categories from "./categories.js";
import asyncHandler from "express-async-handler";
import Product from "../Models/productModel.js";
import Category from "../Models/categoryModel.js";
import connectDatabase from "../MongoDB/connectDB.js";
import dotenv from "dotenv";

dotenv.config();
connectDatabase();

const addData = asyncHandler(async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("Products added!");
});

const addCategories = asyncHandler(async () => {
  await Category.insertMany(categories);
  console.log("Categories added!");
});

addData();
// addCategories();
