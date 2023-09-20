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
exports.router = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const Ticket_1 = require("../models/Ticket");
exports.router = (0, express_1.Router)();
exports.router.get("/ping", (req, res) => {
    res.status(200).json({
        pong: true,
    });
});
exports.router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.find();
    res.status(200).json({
        users,
    });
}));
exports.router.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    try {
        let userExists = yield User_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                error: "User already exists",
            });
        }
        let hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
        let newUser = yield User_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            user: newUser,
        });
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
}));
exports.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "User not found",
            });
        }
        const passwordOk = bcrypt_1.default.compareSync(password, user.password);
        if (passwordOk) {
            return res.status(200).json({
                message: "Login successful",
            });
        }
        else {
            return res.status(400).json({
                error: "Wrong password",
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            error: err,
        });
    }
}));
exports.router.get("/tickets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield Ticket_1.Ticket.find();
    res.status(200).json({
        tickets,
    });
}));
exports.router.post("/create-ticket", (req, res) => {
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
