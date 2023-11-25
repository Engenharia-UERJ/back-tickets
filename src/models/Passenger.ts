import mongoose, { Schema } from "mongoose";

const passengerSchema = new Schema({
  seats: {
    type: Schema.Types.ObjectId,
    ref: "Seat",
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  cpf: {
    type: String,
    required: [true, "CPF is required"],
  },
});

export const Passenger = mongoose.model("Passenger", passengerSchema);
