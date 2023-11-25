import mongoose from "mongoose";
import { Schema } from "mongoose";

const ticketSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantidadeDePassageiros: {
    type: Number,
    required: [true, "Quantity of passengers is required"],
  },
  rota: {
    type: Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
  precoTotal: {
    type: Number,
    required: [true, "Total price is required"],
  },
  passageiros: [
    {
      type: Schema.Types.ObjectId,
      ref: "Passenger",
    },
  ],
});

export const Ticket = mongoose.model("Ticket", ticketSchema);
