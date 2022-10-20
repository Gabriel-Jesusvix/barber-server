import { prisma } from "../../../../database/prismaClient";
import { CreateUserDto } from "../../dtos/CreateUserDTO";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { AppError } from "../../../../error/AppError";

export class CreateUserUseCases {
  async execute({ name, email, password }: CreateUserDto): Promise<User> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordEncrypted,
      },
    });

    return user;
  }
}
