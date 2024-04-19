import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { broadcast } from "../utils/utils";
import { wss } from "../server";

export class UserChatGroupController {
  async addUserToGroup(req: Request, res: Response) {
    const userId = req.userId;
    const chatGroupId = req.params.groupId;

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    };

    if (!chatGroupId) {
      return res.status(404).json({ error: "Chat Group not found" });
    };

    try {
      const userGroup = await prisma.userChatGroup.create({
        data: {
          userId,
          chatGroupId
        }
      });

      broadcast({ type: "userAddedToGroup", userGroup }, wss);
      
      return res.json(userGroup);
    } catch (error) {
      console.error("Error adding user to group:", error);
      return res.status(500).json({ error: "Failed to add user to group" });
    }
  };
}
