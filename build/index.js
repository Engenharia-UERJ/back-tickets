"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./database/connection");
// importação das rotas
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const routesRoutes_1 = __importDefault(require("./routes/routesRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, connection_1.mongooseConnect)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/auth", authRoutes_1.default);
app.use("/routes", routesRoutes_1.default);
app.use("/ticketRoutes", ticketRoutes_1.default);
let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listeting to port ${port}`);
});
