import asyncHandler from "express-async-handler";
import Order from "../Models/orderModel.js";

const createNewOrder = asyncHandler(async (req, res) => {
  const {
    products,
    shippingAddress,
    productsTotalPrice,
    shippingPrice,
    vat,
    discount,
    shippingMethod,
    totalOrderPrice,
  } = req.body;

  const newOrder = await Order.create({
    user: req.user._id,
    products: products.cartProducts,
    shippingAddress,
    productsTotalPrice,
    shippingMethod,
    shippingPrice,
    vat,
    discount,
    totalOrderPrice,
  });

  if (newOrder) {
    res.status(201);
    res.json(newOrder);
  } else {
    res.status(400);
    throw new Error("Order doesn't created successfully");
  }
});

const getOrderDetails = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  const order = await Order.findById(orderId).populate("user", "-password");

  if (order) {
    res.status(200);
    res.json({
      _id: order._id,
      shippingAddress: order.shippingAddress,
      shippingMethod: order.shippingMethod,
      products: order.products,
      user: order.user,
      productsTotalPrice: order.productsTotalPrice,
      shippingPrice: order.shippingPrice,
      vat: order.vat,
      discount: order.discount,
      totalOrderPrice: order.totalOrderPrice,
      createdDate: order.createdAt,
      isPaid: order.isPaid,
      isShipped: order.isDelivered,
      paidAt: order.paidAt,
      paymentDetails: order.paymentDetails,
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getCurrentUserOrders = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.page) || 1;

  const numberOfOrders = await Order.find({ user: req.user._id }).count();

  const currentUsersOrders = await Order.find({ user: req.user._id }).skip(
    pageSize * (page - 1)
  );

  res.status(200);
  res.json({
    orders: currentUsersOrders,
    pages: Math.ceil(numberOfOrders / pageSize),
  });
});

const markOrderAsShipped = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);

  order.isDelivered = true;
  const savedOrder = await order.save();

  res.status(204);
  res.json(savedOrder);
});

export {
  createNewOrder,
  getOrderDetails,
  getCurrentUserOrders,
  markOrderAsShipped,
};
