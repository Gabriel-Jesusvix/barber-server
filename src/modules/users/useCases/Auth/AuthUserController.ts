import { Request, Response } from "express";
import { AuthUserUseCases } from "./AuthUserUseCases";

export class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUser = new AuthUserUseCases();

    const result = await authUser.execute({ email, password });

    return response.status(201).json(result);
  }
}
