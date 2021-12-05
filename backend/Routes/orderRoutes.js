import express from "express";
import {
  createNewOrder,
  getCurrentUserOrders,
  getOrderDetails,
} from "../Controllers/orderControllers.js";
import { authenticatedMiddleware } from "../Middlewares/authenticationMiddleware.js";

const router = express.Router();

router.route("/new").post(authenticatedMiddleware, createNewOrder);
router.route("/get-details/:id").get(getOrderDetails);
router
  .route("/current-user-orders")
  .get(authenticatedMiddleware, getCurrentUserOrders);

export default router;
