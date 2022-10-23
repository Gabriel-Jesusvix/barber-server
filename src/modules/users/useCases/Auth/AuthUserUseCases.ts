import { prisma } from "../../../../database/prismaClient";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { AppError } from "../../../../error/AppError";
import { AuthUserDto } from "../../dtos/AuthUserDto";
import { sign } from "jsonwebtoken";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
export class AuthUserUseCases {
  async execute({ email, password }: AuthUserDto): Promise<IResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError("Login/Senha Invalidos", 404);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError("Login/Senha Invalidos", 404);
    }

    const token = sign({ userId: user?.id }, process.env.HASH as string, {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
