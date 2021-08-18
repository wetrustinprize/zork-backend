import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IUserRequest {
  email: string;
  self: string;
}

class FindUserByEmailService {
  async execute({ email, self }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const foundUser = await usersRepositories.findOne({ email });
    if (!foundUser) {
      throw new Error("User not found.");
    }

    const selfUser = await usersRepositories.findOne(self);
    const isSelf = selfUser.email == email;

    return classToPlain(foundUser, { groups: [isSelf ? "self" : ""] });
  }
}

export { FindUserByEmailService };
