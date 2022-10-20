import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";

const useRoutes = Router();

const createUseController = new CreateUserController();

useRoutes.post("/", createUseController.handle);

export { useRoutes };
