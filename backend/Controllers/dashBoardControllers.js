import Product from "../Models/productModel.js";
import User from "../Models/userModel.js";
import Order from "../Models/orderModel.js";
import asyncHandler from "express-async-handler";

const dashBoardScreenDetails = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  const usersCount = await User.countDocuments();
  const products = await Product.countDocuments();

  const revenue = orders.reduce((acc, item) => acc + item.totalOrderPrice, 0);
  const orderCount = orders.length;

  res.status(200);
  res.json({
    orders: orderCount,
    revenue,
    users: usersCount,
    products,
  });
});

const getDashboardOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "-password");
  res.json(orders);
});

const getDashboardUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

const getDashboardProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export {
  dashBoardScreenDetails,
  getDashboardOrders,
  getDashboardUsers,
  getDashboardProducts,
};
