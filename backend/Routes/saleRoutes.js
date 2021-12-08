import express from "express";
import {
  getCurrentSale,
  startSale,
  stopSale,
} from "../Controllers/SalesControllers.js";
import {
  adminProtect,
  authenticatedMiddleware,
} from "../Middlewares/authenticationMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, adminProtect, startSale)
  .put(authenticatedMiddleware, adminProtect, stopSale)
  .get(getCurrentSale);

export default router;
