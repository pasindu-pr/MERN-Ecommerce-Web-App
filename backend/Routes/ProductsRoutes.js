import express from "express";
import {
  createProduct,
  getLatestProducts,
  getProductDetails,
  deleteProducts,
  getProductsByCategories,
  getCloudinarySign,
  getCloudinaryProfile,
} from "../Controllers/ProductsControllers.js";

const router = express.Router();

router.route("/new").post(createProduct);
router.route("/cloudinary-sign").get(getCloudinarySign);
router.route("/cloudinary-profile").get(getCloudinaryProfile);
router.route("/latest").get(getLatestProducts);
router.route("/cat/:category").get(getProductsByCategories);
router.route("/:id").get(getProductDetails);
router.route("/").delete(deleteProducts);

export default router;
