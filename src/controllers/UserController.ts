import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class UserController {
  async store(req: Request, res: Response) {
    const { fullname, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      fullname,
      email,
      password,
    });

    return res.json(user);
  }
}

export { UserController };
