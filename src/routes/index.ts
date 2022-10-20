import { Router } from "express";
import { useRoutes } from "./user.routes";

const routes = Router();

routes.use("/register", useRoutes);

export { routes };
