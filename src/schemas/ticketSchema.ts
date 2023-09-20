import mongoose from "mongoose";

export const ticketSchema = new mongoose.Schema({
  // Informações do passageiro
  passengerName: {
    type: String,
    required: [true, "Passenger name is required"],
  },
  passengerEmail: {
    type: String,
    required: [true, "Passenger email is required"],
  },

  // Informações da viagem
  departureCity: {
    type: String,
    required: [true, "Departure city is required"],
  },
  arrivalCity: {
    type: String,
    required: [true, "Arrival city is required"],
  },
  departureDate: {
    type: Date,
    required: [true, "Departure date is required"],
  },
  seatNumber: {
    type: Number,
    required: [true, "Seat number is required"],
  },

  // Informações de pagamento
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Payment method is required"],
    enum: ["credit card", "debit card", "cash"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
