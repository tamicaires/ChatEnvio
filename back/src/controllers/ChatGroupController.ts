import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { broadcast } from "../utils/utils";
import { wss } from "../server";

export class ChatGroupController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const chatGroup = await prisma.chatGroup.create({
      data: {
        name,
        description
      }
    });

    broadcast({ type: "chatGroup", chatGroup }, wss)
    return res.json(chatGroup);
  };

  async update(req: Request, res: Response) {
    const { groudId } = req.params;
    const { name, description } = req.body;

    const chatGroup = await prisma.chatGroup.create({
      data: {
        name,
        description
      }
    });

    broadcast({ type: "chatGroup", chatGroup }, wss)
    return res.json(chatGroup);
  };

  async getChatGroup(req: Request, res: Response) {
    const { name, description } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Chat group ID is required" });
    };

    const chatGroup = await prisma.chatGroup.update({
      where: { id },
      data: {
        name,
        description
      }
    });

    if (!chatGroup) {
      return res.status(404).json({ error: "Chat group not found" });
    };

    return res.json(chatGroup);
  };

  async listChatGroups(req: Request, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    };

    const userChatGroups = await prisma.chatGroup.findMany();

    return res.json(userChatGroups);
  };
};