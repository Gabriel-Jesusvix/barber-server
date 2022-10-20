import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";
import bcrypt from "bcrypt";

export class UserController {
  async handleCreateUser(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const salt = await bcrypt.genSalt(20);
    const passwordEncrypted = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordEncrypted,
      },
    });
    return response.status(201).json(user);
  }
}
