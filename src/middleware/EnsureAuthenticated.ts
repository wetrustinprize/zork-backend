import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../utilities/HTTPErrors";

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
    throw new UnauthorizedError("Require a authentication token.");
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "ZORK") as IPayLoad;

    request.user_id = sub;

    return next();
  } catch (err) {
    throw new ForbiddenError("Not valid authentication token.");
  }
}
