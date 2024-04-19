import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/auth";
import { MessageController } from "../controllers/MessageController";
import { ChatGroupController } from "../controllers/ChatGroupController";
import { UserChatGroupController } from "../controllers/UserChatGroup";

const userController = new UserController();
const authController = new AuthController();
const chatGroupController = new ChatGroupController();
const userChatGroupController = new UserChatGroupController();
const messageController = new MessageController();

export const router = Router();

//Rotas para usuário
router.post("/create", userController.create);
router.get("/users", AuthMiddleware, userController.listUsers);
router.post("/login", authController.authenticate);

// Rotas para chat grupos
router.post("/chat-groups", AuthMiddleware, chatGroupController.create);
router.get("/chat-groups", AuthMiddleware, chatGroupController.listChatGroups);
router.get("/chat-groups/:id", AuthMiddleware, chatGroupController.getChatGroup);
router.put("/chat-groups/:id", AuthMiddleware, chatGroupController.getChatGroup);

// Adicionar usuário a um grupo existente
router.post("/chat-groups/:groupId/add-user", AuthMiddleware, userChatGroupController.addUserToGroup);

// Rotas para mensagens
router.post("/message", AuthMiddleware, messageController.create);
router.get("/message/:groupId", AuthMiddleware, messageController.listMessages);

// Rota padrão para lidar com URLs não encontradas
router.all("*", (req, res) =>
  res.status(404).json({ error: "URL not found" })
);

