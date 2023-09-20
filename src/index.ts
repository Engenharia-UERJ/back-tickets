import express from "express";
import { router } from "./routes";
import cors from "cors";

import dotenv from "dotenv";
import { mongooseConnect } from "./database/connection";

dotenv.config();

const app = express();
mongooseConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listeting to port ${port}`);
});
