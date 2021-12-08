import asyncHandler from "express-async-handler";
import Product from "../Models/productModel.js";
import Sale from "../Models/saleModel.js";

const startSale = asyncHandler(async (req, res) => {
  const { saleName, discountPrecentage } = req.body;

  console.log(req.body);

  const sale = new Sale({
    saleName,
    discountPrecentage,
    isSaleRunning: true,
  });

  await sale.save();

  res.status(201);
  res.json({ message: "Sale created successfully" });
});

const stopSale = asyncHandler(async (req, res) => {
  const { saleId } = req.body;

  const sale = await Sale.findById(saleId);
  sale.isSaleRunning = false;

  await sale.save();

  res.status(201);
  res.json({ message: "Sale stopped successfully" });
});

const getCurrentSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findOne({ isSaleRunning: true });

  res.status(200);
  res.json(sale);
});

const getRunningSale = async () => {
  const runningSale = await Sale.findOne({ isSaleRunning: true });
  return runningSale;
};

export { startSale, stopSale, getRunningSale, getCurrentSale };
