import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { classToPlain } from "class-transformer";

class FindUserService {
  async execute(id: string, self: boolean = false) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (!id) {
      throw new Error("Invalid ID");
    }

    const user = await usersRepositories.findOne(id);
    if (!user) {
      throw new Error("Invalid ID");
    }

    return classToPlain(user, { groups: [self ? "self" : ""] });
  }
}

export { FindUserService };
