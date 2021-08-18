import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { RequestsRepositories } from "../../repositories/RequestsRepositories";
import { CreateTransactionService } from "../Transaction/CreateTransactionService";

interface IRequestRequest {
  id: string;
  self: string;
}

class AcceptRequestService {
  async execute({ id, self: from }: IRequestRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const requestsRepositories = getCustomRepository(RequestsRepositories);

    const fromUser = await usersRepositories.findOne({ id: from });
    const request = await requestsRepositories.findOne(id);

    // Check if request is completed or canceled
    if (request.completed) {
      throw new Error("This request is completed");
    }

    if (request.request_canceled) {
      throw new Error("This request is canceled");
    }

    // Check if to is not the same as from
    if (request.to_id !== fromUser.id) {
      throw new Error("This request isn't for you");
    }

    // Check if user has sufficient zorks
    if (fromUser.zorks < request.zorks) {
      throw new Error("You don't have enough Zorks");
    }

    // Make transaction
    const toUser = await usersRepositories.findOne({ id: request.from_id });

    const createTransactionService = new CreateTransactionService();
    const transaction = await createTransactionService.execute({
      email: toUser.email,
      value: request.zorks,
      from: fromUser.id,
      description: request.description,
      is_public: true,
    });

    // Save request
    request.request_result = transaction.id;

    return request;
  }
}

export { AcceptRequestService };
