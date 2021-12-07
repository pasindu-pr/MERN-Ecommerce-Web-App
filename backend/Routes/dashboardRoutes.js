import express from "express";
import {
  dashBoardScreenDetails,
  getDashboardOrders,
  getDashboardUsers,
  getDashboardProducts,
} from "../Controllers/dashBoardControllers.js";
import { markOrderAsShipped } from "../Controllers/orderControllers.js";
import {
  authenticatedMiddleware,
  adminProtect,
} from "../Middlewares/authenticationMiddleware.js";

const router = express.Router();

router.get("/", authenticatedMiddleware, adminProtect, dashBoardScreenDetails);
router
  .route("/orders")
  .get(authenticatedMiddleware, adminProtect, getDashboardOrders);
router
  .route("/users")
  .get(authenticatedMiddleware, adminProtect, getDashboardUsers);
router
  .route("/products")
  .get(authenticatedMiddleware, adminProtect, getDashboardProducts);

router.route("/ship").put(markOrderAsShipped);

export default router;
