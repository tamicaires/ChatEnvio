import { Request, Response } from "express";
import { broadcast } from "../utils/utils";
import { wss } from "../server";
import { prisma } from "../database/prisma";
import { ChatMessage } from "../interfaces/chat-message.interface";
import { MessageViewModel } from "./messageViewModel/messageViewModel";

export class MessageController {
  async create(req: Request, res: Response) {
    const { text, fromMe, chatGroupId } = req.body;
    const senderId = req.userId;

    const sender = await prisma.user.findUnique({
      where: {
        id: senderId
      }
    });

    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    const message: ChatMessage = await prisma.message.create({
      data: {
        text,
        senderId,
        fromMe,
        chatGroupId,
      }
    });

    const messageWithSender = {
      ...message,
      senderUsername: sender.username
    };

    broadcast({ type: "message", messageWithSender }, wss);
    return res.json(messageWithSender);
  };

  async listMessages(req: Request, res: Response) {
    const { groupId } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        chatGroupId: groupId
      },
      include: {
        sender: {
          select: {
            username: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const mapperMessages = MessageViewModel.toHttp(messages);
    res.json(mapperMessages);
  };
};
