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
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const productsCounts = await Product.countDocuments();
  const products = await Product.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200);
  res.json({ products, page, pages: Math.ceil(productsCounts / pageSize) });
});

export {
  dashBoardScreenDetails,
  getDashboardOrders,
  getDashboardUsers,
  getDashboardProducts,
};
