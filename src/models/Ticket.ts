import mongoose from "mongoose";
import { ticketSchema } from "../schemas/ticketSchema";

export const Ticket = mongoose.model("Ticket", ticketSchema);
