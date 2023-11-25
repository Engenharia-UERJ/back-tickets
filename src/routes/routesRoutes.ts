import express from "express";
import { Request, Response } from "express";
import { Route } from "../models/Route";

const router = express.Router();

router.post("/get-routes", async (req: Request, res: Response) => {
  const { origin, destination, departureDate } = req.body;

  const tickets = await Route.find({
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
});

router.post("/create-route", async (req: Request, res: Response) => {
  const { origem, destino, horaPartida, dataPartida, passagens } = req.body;

  try {
    const route = await Route.create({
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
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

router.put("/update-route/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { origem, destino, horaPartida, dataPartida, passagens } = req.body;

  try {
    const route = await Route.findByIdAndUpdate(
      id,
      {
        origem,
        destino,
        horaPartida,
        dataPartida,
        passagens,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Rota atualizada com sucesso",
      route,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

router.delete("/delete-route/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const route = await Route.findByIdAndDelete(id);

    res.status(200).json({
      message: "Rota deletada com sucesso",
      route,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

router.get("/routes", async (req: Request, res: Response) => {
  const routes = await Route.find();

  res.status(200).json({
    routes,
  });
});

export default router;
