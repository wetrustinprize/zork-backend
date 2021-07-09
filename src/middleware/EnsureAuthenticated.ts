import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  // Verificar se tem autenticação
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "ZORK") as IPayLoad;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
