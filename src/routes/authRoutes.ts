import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/User";
import { UserDocument } from "../interfaces";

const router = express.Router();

// create user
router.post("/create-user", async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;
    const saltRounds = 10;

    if (password !== confirmPassword) {
      res.status(400).json({
        message: "Passwords don't match",
      });
    }

    let userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    let newUser = await User.create({
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
  } catch (err) {
    console.log("Erro ao criar usuário", err);
    res.status(400).json({
      error: err,
    });
  }
});

// login

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

    if (!passwordOk) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
});

// get users
router.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

export default router;
