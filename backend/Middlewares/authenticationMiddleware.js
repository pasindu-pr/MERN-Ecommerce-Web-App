import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

const authenticatedMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken.userID).select("-password");

      req.user = user;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Sorry you are not authorized. Token Validation Failed!");
    }
  } else {
    if (!token) {
      res.status(400);
      throw new Error("Sorry, you are unauthorized to view this route!");
    }
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken.userID).select("-password");

      if (user.accountType === "Administrator") {
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error("Sorry you are not authorized. Token Validation Failed!");
    }
  } else {
    if (!token) {
      res.status(400);
      throw new Error("Sorry, check your login credentials and try again.");
    }
  }
});

export { authenticatedMiddleware, adminProtect };
