import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { RequestsRepositories } from "../../repositories/RequestsRepositories";
import { CreateTransactionService } from "../Transaction/CreateTransactionService";

interface IRequestRequest {
  id: string;
  self: string;
}

class AcceptRequestService {
  async execute({ id, self }: IRequestRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const requestsRepositories = getCustomRepository(RequestsRepositories);

    const selfUser = await usersRepositories.findOne({ id: self });
    const request = await requestsRepositories.findOne(id);

    console.log(request);

    // Check if request is completed or canceled
    if (request.request_result !== null) {
      throw new Error("This request is completed");
    }

    if (request.request_canceled) {
      throw new Error("This request is canceled");
    }

    // Check if to is not the same as from
    if (request.to_id !== selfUser.id) {
      throw new Error("This request isn't for you");
    }

    // Check if user has sufficient zorks
    if (selfUser.zorks < request.zorks) {
      throw new Error("You don't have enough Zorks");
    }

    // Make transaction
    const toUser = await usersRepositories.findOne({ id: request.from_id });

    const createTransactionService = new CreateTransactionService();
    const transaction = await createTransactionService.execute({
      email: toUser.email,
      value: request.zorks,
      from: selfUser.id,
      description: request.description,
      is_public: true,
    });

    // Save request
    request.request_result = transaction.id;

    requestsRepositories.save(request);

    return request;
  }
}

export { AcceptRequestService };
