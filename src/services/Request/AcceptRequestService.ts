import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { RequestsRepositories } from "../../repositories/RequestsRepositories";
import { CreateTransactionService } from "../Transaction/CreateTransactionService";
import { BadRequestError, ForbiddenError } from "../../utilities/HTTPErrors";

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

    if (request.to_id !== self) {
      throw new ForbiddenError("This request isn't for you");
    }

    if (request.request_result !== null) {
      throw new BadRequestError("This request has already been completed");
    }

    if (request.request_canceled) {
      throw new BadRequestError("This request has already been canceled");
    }

    // Check if user has sufficient zorks
    if (selfUser.zorks < request.zorks) {
      throw new BadRequestError("You don't have enough Zorks");
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
