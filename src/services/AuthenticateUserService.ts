import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";
import { BadRequestError } from "../utilities/HTTPErrors";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories);

    // Verficiar se email existe
    const user = await userRepositories.findOne({ email });

    if (!user) {
      throw new BadRequestError("Email/Password incorrect");
    }

    // Verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Email/Password incorrect");
    }

    // Gerar token
    const token = sign(
      {
        email: user.email,
      },
      "ZORK",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { access_token: token };
  }
}

export { AuthenticateUserService };
