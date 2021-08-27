import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { RequestsRepositories } from "../../repositories/RequestsRepositories";
import { BadRequestError, ForbiddenError } from "../../utilities/HTTPErrors";

interface IRequestRequest {
  id: string;
  self: string;
}

class FindRequestService {
  async execute({ id, self }: IRequestRequest) {
    const requestRepositories = getCustomRepository(RequestsRepositories);

    const request = await requestRepositories.findOne(id);
    if (!request) {
      throw new BadRequestError("Invalid request ID");
    }

    if (request.from_id !== self && request.to_id !== self) {
      throw new ForbiddenError("This request isn't yours or isn't for you");
    }

    return classToPlain(request);
  }
}

export { FindRequestService };
