import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../error/AppError";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("Invalid Token", 401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, "56bb30720221cf42b670106b3e5d2365");
    const { id } = data as TokenPayload;

    request.userId = id;

    return next();
  } catch {
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
