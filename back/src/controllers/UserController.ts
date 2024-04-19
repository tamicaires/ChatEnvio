import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcrypt";


export class UserController {
  async create(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.json({ error: "User already exists" });
    };

    const hash_password = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash_password
      }
    });

    return res.json({ user });
  };

  async listUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany({});

    return res.json({ users });
  };
};