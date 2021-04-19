import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const comparePassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const generateJWToken = (userID) => {
  return JWT.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
};

export { comparePassword, generateJWToken };
