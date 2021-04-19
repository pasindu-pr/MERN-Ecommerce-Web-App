import express from "express";
import { getAllCategories } from "../Controllers/CategoriesController.js";

const router = express.Router();

router.route("/").get(getAllCategories);

export default router;
