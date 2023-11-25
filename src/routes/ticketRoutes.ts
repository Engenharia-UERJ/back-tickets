import express, { Request, Response } from "express";
import { Ticket } from "../models/Ticket";

const router = express.Router();

router.get("/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find();

  res.status(200).json({
    tickets,
  });
});

router.post("/buy-ticket", (req: Request, res: Response) => {
  const {
    passengerName,
    passengerEmail,
    departureCity,
    arrivalCity,
    departureDate,
    seatNumber,
    totalPrice,
    paymentMethod,
    user,
  } = req.body;

  Ticket.create({
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

export default router;
