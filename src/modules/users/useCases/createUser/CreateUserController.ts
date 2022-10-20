import { Request, Response } from "express";
import { CreateUserUseCases } from "./CreateUserUseCases";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserUseCase = new CreateUserUseCases();

    const result = await createUserUseCase.execute({ name, email, password });

    return response.status(201).json(result);
  }
}
