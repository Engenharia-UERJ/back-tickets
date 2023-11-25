"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const routeSchema = new mongoose_1.Schema({
    origin: {
        type: String,
        required: [true, "Origin city is required"],
    },
    destination: {
        type: String,
        required: [true, "Destination city is required"],
    },
    departureTime: {
        type: String,
        required: [true, "Departure time is required"],
    },
    departureDate: {
        type: Date,
        default: Date.now,
        required: [true, "Departure date is required"],
    },
    tickets: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Ticket",
        },
    ],
});
exports.Route = mongoose_1.default.model("Route", routeSchema);
