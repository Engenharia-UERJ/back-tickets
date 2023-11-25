"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ticketSchema = new mongoose_2.Schema({
    usuario: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quantidadeDePassageiros: {
        type: Number,
        required: [true, "Quantity of passengers is required"],
    },
    rota: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "Route",
        required: true,
    },
    precoTotal: {
        type: Number,
        required: [true, "Total price is required"],
    },
    passageiros: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: "Passenger",
        },
    ],
});
exports.Ticket = mongoose_1.default.model("Ticket", ticketSchema);
