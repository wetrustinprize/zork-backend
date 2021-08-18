import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { RequestsRepositories } from "../../repositories/RequestsRepositories";

interface IRequestRequest {
  id: string;
  self: string;
}

class FindRequestService {
  async execute({ id, self }: IRequestRequest) {
    const requestRepositories = getCustomRepository(RequestsRepositories);

    const request = await requestRepositories.findOne(id);
    if (!request) {
      throw new Error("Invalid ID");
    }

    if (request.from_id !== self && request.to_id !== self) {
      throw new Error("You can't see this request");
    }

    return classToPlain(request);
  }
}

export { FindRequestService };
