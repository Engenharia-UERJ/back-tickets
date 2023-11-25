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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const router = express_1.default.Router();
// create user
router.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword, role } = req.body;
        const saltRounds = 10;
        if (password !== confirmPassword) {
            res.status(400).json({
                message: "Passwords don't match",
            });
        }
        let userExists = yield User_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                error: "User already exists",
            });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
        let newUser = yield User_1.User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        res.status(201).json({
            message: "Usuário criado com sucesso",
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (err) {
        console.log("Erro ao criar usuário", err);
        res.status(400).json({
            error: err,
        });
    }
}));
// login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "User not found",
            });
        }
        const passwordOk = bcrypt_1.default.compareSync(password, user.password);
        if (!passwordOk) {
            return res.status(400).json({
                message: "Wrong password",
            });
        }
        return res.status(200).json({
            message: "Login successful",
            user,
        });
    }
    catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
}));
// get users
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.find();
    res.status(200).json({
        users,
    });
}));
exports.default = router;
