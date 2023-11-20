import mongoose from "mongoose";
import { userSchema } from "../schemas/userSchema";

export const User = mongoose.model("User", userSchema);


