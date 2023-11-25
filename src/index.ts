import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongooseConnect } from "./database/connection";

// importação das rotas
import authRoutes from "./routes/authRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import routeRoutes from "./routes/routesRoutes";

dotenv.config();

const app = express();
mongooseConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/routes", routeRoutes);
app.use("/ticketRoutes", ticketRoutes);

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listeting to port ${port}`);
});
