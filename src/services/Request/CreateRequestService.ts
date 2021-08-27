import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { RequestsRepositories } from "../../repositories/RequestsRepositories";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { BadRequestError } from "../../utilities/HTTPErrors";

interface IRequestRequest {
  self: string;
  email: string;
  description?: string;
  value: number;
}

class CreateRequestService {
  async execute({
    self: from,
    email,
    description = "",
    value,
  }: IRequestRequest) {
    const requestRepositories = getCustomRepository(RequestsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Check if "to" User exists
    const toUser = await usersRepositories.findOne({ email });
    if (!toUser) {
      throw new BadRequestError("Invalid user");
    }

    // Check if "from" and "to" aren't the same person
    if (toUser.id == from) {
      throw new BadRequestError("You can't request to yourself");
    }

    // Get "from" User
    const fromUser = await usersRepositories.findOne(from);

    // Create request
    const request = requestRepositories.create({
      from_id: fromUser.id,
      to_id: toUser.id,
      zorks: value,
      description,
      request_canceled: false,
      request_result: null,
      last_zorks: value,
    });

    await requestRepositories.save(request);

    return classToPlain(request);
  }
}

export { CreateRequestService };
