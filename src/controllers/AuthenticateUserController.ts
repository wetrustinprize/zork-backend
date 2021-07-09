import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute({ email, password });

    return res.json(token);
  }
}

export { AuthenticateUserController };
