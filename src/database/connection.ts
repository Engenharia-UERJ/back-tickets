import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
dotenv.config();

export const mongooseConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL_CONNECT as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
