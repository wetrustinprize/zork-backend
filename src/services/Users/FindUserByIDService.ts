import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IUserRequest {
  id: string;
  self?: boolean;
}

class FindUserByIDService {
  async execute({ id, self = false }: IUserRequest) {
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

export { FindUserByIDService };
