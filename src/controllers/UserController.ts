import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { FindUserService } from "../services/FindUserService";

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

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req;

    const findUserSerivce = new FindUserService();

    const user = await findUserSerivce.execute(!id ? user_id : id, !id);

    return res.json(user);
  }
}

export { UserController };
