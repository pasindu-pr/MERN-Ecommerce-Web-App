import express from "express";
import {
  createProduct,
  getLatestProducts,
  getProductDetails,
  uploadProductImage,
  deleteProducts,
  getProductsByCategories,
} from "../Controllers/ProductsControllers.js";

const router = express.Router();

router.route("/new").post(createProduct);
router.route("/upload").post(uploadProductImage);
router.route("/latest").get(getLatestProducts);
router.route("/cat/:category").get(getProductsByCategories);
router.route("/:id").get(getProductDetails);
router.route("/").delete(deleteProducts);

export default router;
