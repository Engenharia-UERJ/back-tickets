import mongoose, { Schema } from "mongoose";

const seatSchema = new Schema({
  numeroAssento: {
    type: Number,
    required: [true, "Seat number is required"],
  },
  ocupado: {
    type: Boolean,
    required: [true, "Seat availability is required"],
  },
  passageiro: {
    type: Schema.Types.ObjectId,
    ref: "Passenger",
    required: true,
  },
});

export const Seat = mongoose.model("Seat", seatSchema);
