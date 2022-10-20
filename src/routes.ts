import { Router } from "express";
import { UserController } from "./controllers/userController";

const router = Router();

const createUser = new UserController();

router.post("/login", (request, response) => {
  return response.json({ ok: true });
});

router.post("/register", createUser.handleCreateUser);

export { router };
