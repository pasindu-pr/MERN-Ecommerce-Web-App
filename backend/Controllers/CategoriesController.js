import asyncHandler from "express-async-handler";
import Category from "../Models/categoryModel.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

export { getAllCategories };
