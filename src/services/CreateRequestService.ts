import { getCustomRepository } from "typeorm";
import { RequestsRepositories } from "../repositories/RequestsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IRequestRequest {
  from: string;
  email: string;
  description?: string;
  value: number;
}

class CreateRequestService {
  async execute({ from, email, description = "", value }: IRequestRequest) {
    const requestRepositories = getCustomRepository(RequestsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Check if "to" User exists
    const toUser = await usersRepositories.findOne({ email });
    if (!toUser) {
      throw new Error("Invalid user");
    }

    // Check if "from" and "to" aren't the same person
    if (toUser.id == from) {
      throw new Error("You can't request to yourself");
    }

    // Check if "from" has enough Zorks
    const fromUser = await usersRepositories.findOne(from);
    if (fromUser.zorks < value) {
      throw new Error("You don't have enough Zorks");
    }

    // Create request
    const request = requestRepositories.create({
      from_id: fromUser.id,
      to_id: toUser.id,
      zorks: value,
      description,
      request_canceled: false,
      request_result: "",
      last_zorks: value,
    });

    await requestRepositories.save(request);

    return request;
  }
}

export { CreateRequestService };
