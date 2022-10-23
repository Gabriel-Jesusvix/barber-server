import { Router } from "express";
import { AuthUserController } from "../modules/users/useCases/Auth/AuthUserController";

const authUser = Router();

const autenticateUser = new AuthUserController();

authUser.post("/", autenticateUser.handle);

export { authUser };
