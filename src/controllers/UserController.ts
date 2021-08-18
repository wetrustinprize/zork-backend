import { Request, Response } from "express";
import { CreateUserService } from "../services/Users/CreateUserService";
import { FindUserByEmailService } from "../services/Users/FindUserByEmailService";
import { FindUserByIDService } from "../services/Users/FindUserByIDService";
import { IndexUserService } from "../services/Users/IndexUserService";

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

  async index(req: Request, res: Response) {
    const indexUserService = new IndexUserService();

    const users = await indexUserService.execute();

    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const { id, email } = req.params;
    const { user_id } = req;

    // If there is no email in the params, show user by ID
    if (!email) {
      const findUserSerivce = new FindUserByIDService();

      const userToFind = !id ? user_id : id;

      const user = await findUserSerivce.execute({
        id: userToFind,
        self: userToFind == user_id,
      });

      return res.json(user);
    }
    // If there is a email in the params, show user by email
    else {
      const findUserService = new FindUserByEmailService();

      const user = await findUserService.execute({ email, self: user_id });

      return res.json(user);
    }
  }
}

export { UserController };
