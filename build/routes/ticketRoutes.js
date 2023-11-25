"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Ticket_1 = require("../models/Ticket");
const router = express_1.default.Router();
router.get("/tickets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield Ticket_1.Ticket.find();
    res.status(200).json({
        tickets,
    });
}));
router.post("/buy-ticket", (req, res) => {
    const { passengerName, passengerEmail, departureCity, arrivalCity, departureDate, seatNumber, totalPrice, paymentMethod, user, } = req.body;
    Ticket_1.Ticket.create({
        passengerName,
        passengerEmail,
        departureCity,
        arrivalCity,
        departureDate,
        seatNumber,
        totalPrice,
        paymentMethod,
        user,
    })
        .then((ticket) => {
        res.status(201).json({
            ticket,
        });
    })
        .catch((err) => {
        res.status(400).json({
            error: err,
        });
    });
});
exports.default = router;
