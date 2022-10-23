import { Router } from "express";
import { authUser } from "./autenticate.routes";
import { useRoutes } from "./user.routes";

const routes = Router();

routes.use("/register", useRoutes);
routes.use("/login", authUser);

export { routes };
