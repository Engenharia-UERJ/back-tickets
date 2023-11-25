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
const Route_1 = require("../models/Route");
const router = express_1.default.Router();
router.post("/get-routes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination, departureDate } = req.body;
    const tickets = yield Route_1.Route.find({
        origin,
        destination,
        departureDate,
    });
    if (!tickets) {
        console.log("Erro ao encontrar rota");
        return res.status(400).json({
            message: "Não foi possível encontrar a rota",
        });
    }
    if (tickets.length === 0) {
        return res.status(404).json({
            message: "Não há passagens disponíveis para essa rota",
        });
    }
    res.status(200).json({
        message: "Rotas encontradas com sucesso",
        tickets,
    });
}));
router.post("/create-route", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origem, destino, horaPartida, dataPartida, passagens } = req.body;
    try {
        const route = yield Route_1.Route.create({
            origem,
            destino,
            horaPartida,
            dataPartida,
            passagens,
        });
        res.status(201).json({
            message: "Rota criada com sucesso",
            route,
        });
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
}));
router.put("/update-route/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { origem, destino, horaPartida, dataPartida, passagens } = req.body;
    try {
        const route = yield Route_1.Route.findByIdAndUpdate(id, {
            origem,
            destino,
            horaPartida,
            dataPartida,
            passagens,
        }, { new: true });
        res.status(200).json({
            message: "Rota atualizada com sucesso",
            route,
        });
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
}));
router.delete("/delete-route/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const route = yield Route_1.Route.findByIdAndDelete(id);
        res.status(200).json({
            message: "Rota deletada com sucesso",
            route,
        });
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
}));
router.get("/routes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const routes = yield Route_1.Route.find();
    res.status(200).json({
        routes,
    });
}));
exports.default = router;
