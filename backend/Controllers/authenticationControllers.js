import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import {
  comparePassword,
  generateJWToken,
} from "../Utilities/authenticationUtils.js";

//Authenticate User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser && (await comparePassword(password, foundUser.password))) {
    res.status(200);
    res.json({
      name: foundUser.name,
      email: foundUser.email,
      joined: foundUser.joined,
      lastActive: foundUser.lastActive,
      accountType: foundUser.accountType,
      token: generateJWToken(foundUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Username or Password Incorrect.");
  }
});

//Create new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("There's an account with this email. Please Login");
  }

  const registeredUser = await User.create({
    name,
    email,
    password,
  });

  if (registerUser) {
    res.status(201);
    res.json({
      name: registeredUser.name,
      email: registeredUser.email,
      accountType: registeredUser.accountType,
    });
  } else {
    res.status(404);
    throw new Error(
      "Information you entered are incorrect. Please check them and try again."
    );
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userDetails = await User.findById(req.user._id);

  if (userDetails) {
    res.status(200);
    res.json({
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      accountType: userDetails.accountType,
    });
  } else {
    res.status(404);
    throw new Error("Sorry! We are unable to find the user.");
  }
});

export { loginUser, registerUser, getUserProfile };
