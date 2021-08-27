import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { validate as email_validate } from "email-validator";
import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { BadRequestError } from "../../utilities/HTTPErrors";

interface IUserRequest {
  fullname: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ fullname, email, password }: IUserRequest) {
    const userRepo = getCustomRepository(UsersRepositories);

    // Check if e-mail is valid
    if (!email_validate(email)) {
      throw new BadRequestError("Invalid email");
    }

    // Check if name isn't empty
    if (!fullname) {
      throw new BadRequestError("Fullname can't be empty");
    }

    // Check if password is valid
    if (!password) {
      throw new BadRequestError("Password can't be empty");
    }

    // Check if user already exists
    const userAlreadyExists = await userRepo.findOne({ email });

    if (userAlreadyExists) {
      throw new BadRequestError("There is already a user with this email");
    }

    // Creates new user
    const passwordHash = await hash(password, 8);

    const user = userRepo.create({
      fullname,
      email,
      password: passwordHash,
    });

    await userRepo.save(user);

    return classToPlain(user);
  }
}

export { CreateUserService };
