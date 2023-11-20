import bcrypt from "bcrypt";
import { Router } from "express";
import { Request, Response } from "express";
import { User } from "../models/User";
import { UserDocument } from "../interfaces";
import { Ticket } from "../models/Ticket";

export const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({
    pong: true,
  });
});

router.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

router.post("/create-user", async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;
  const saltRounds = 10;

  if (password !== confirmPassword) {
    res.status(400).json({
      message: "Passwords don't match",
    });
  }

  try {
    let userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    let hashedPassword = bcrypt.hashSync(password, saltRounds);

    let newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: UserDocument | null = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const passwordOk = bcrypt.compareSync(password, user.password);

    if (passwordOk) {
      return res.status(200).json({
        message: "Login successful",
      });
    } else {
      return res.status(400).json({
        message: "Wrong password",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
});

router.get("/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find();

  res.status(200).json({
    tickets,
  });
});

router.post("/create-ticket", (req: Request, res: Response) => {
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
