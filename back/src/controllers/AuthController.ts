import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { UserPayload } from "../interfaces/user.interface";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ error: "User not found" });
    };

    const isValuePassword = await compare(password, user.password);

    if (!isValuePassword) {
      return res.json({ error: "Email or password invalid" });
    };

    const payload: UserPayload = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    const secret = process.env.JWT_SECRET || '';

    const token = sign({ id: user.id }, secret, { expiresIn: "30d" })

    return res.json({ payload, token });
  };
};