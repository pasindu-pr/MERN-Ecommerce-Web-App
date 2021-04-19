import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Order from "../Models/orderModel.js";
import Product from "../Models/productModel.js";

const getPaymentIntentController = asyncHandler(async (req, res) => {
  const { amount, email, orderId } = req.body;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    receipt_email: email,
    metadata: {
      orderId: orderId,
    },
  });

  console.log(paymentIntent);

  res.status(201);
  res.json(paymentIntent.client_secret);
});

const retriveAndUpdatePayment = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { paymentId } = req.body;

  const paymentInfo = await stripe.paymentIntents.retrieve(paymentId);

  const {
    id,
    amount,
    amount_received,
    metadata,
    charges,
    status,
  } = paymentInfo;

  const order = await Order.findById(metadata.orderId);

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentDetails = {
    paymentId: id,
    orderId: metadata.orderId,
    orderPrice: amount,
    recievedAmount: amount_received,
    cardHolderName: charges.data[0].billing_details.name,
    cardBrand: charges.data[0].payment_method_details.card.brand,
    status,
  };

  const updatedOrder = await order.save();

  if (updatedOrder) {
    res.status(200);
    res.json({
      status: "succeeded",
      message: "Order status updated successfully!",
    });
  } else {
    res.status(400);
  }
});

export { getPaymentIntentController, retriveAndUpdatePayment };
