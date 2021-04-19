import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const connectDatabase = asyncHandler(async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log(`MongoDB Connected on ${connection.connection.host}`);
});

export default connectDatabase;
