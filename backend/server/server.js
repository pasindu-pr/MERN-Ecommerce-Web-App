import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import fileUpload from "express-fileupload";
import connectDatabase from "../MongoDB/connectDB.js";
import productsRoutes from "../Routes/ProductsRoutes.js";
import categoryRoutes from "../Routes/CategoriesRoutes.js";
import authenticationRoutes from "../Routes/authenticationRoutes.js";
import orderRoutes from "../Routes/orderRoutes.js";
import paymentRoutes from "../Routes/paymentRoutes.js";
import dashboardRoutes from "../Routes/dashboardRoutes.js";
import {
  notFoundHandler,
  customErrorHandler,
} from "../Middlewares/errorhandlers.js";

const app = express();
app.use(morgan("dev"));
app.use(fileUpload());
dotenv.config();
connectDatabase();

const __dirname = path.resolve();
app.use("/Uploads", express.static(path.join(__dirname, "/Uploads")));

app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", authenticationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
  });
}

app.use(notFoundHandler);
app.use(customErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is up and running on Port: ${port}`);
});
