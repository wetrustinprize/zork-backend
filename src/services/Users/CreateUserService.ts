import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { validate as email_validate } from "email-validator";
import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";

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
      throw new Error("Email is not valid");
    }

    // Check if name isn't empty
    if (!fullname) {
      throw new Error("Name is not valid");
    }

    // Check if password is valid
    if (!password) {
      throw new Error("Password is not valid");
    }

    // Check if user already exists
    const userAlreadyExists = await userRepo.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already exists");
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
