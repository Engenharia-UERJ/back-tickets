"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ticketSchema_1 = require("../schemas/ticketSchema");
exports.Ticket = mongoose_1.default.model("Ticket", ticketSchema_1.ticketSchema);
