import express from "express";
import {
  createNewOrder,
  getOrderDetails,
} from "../Controllers/orderControllers.js";
import { authenticatedMiddleware } from "../Middlewares/authenticationMiddleware.js";

const router = express.Router();

router.route("/new").post(authenticatedMiddleware, createNewOrder);
router.route("/get-details/:id").get(getOrderDetails);

export default router;
