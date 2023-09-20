"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ticketSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
