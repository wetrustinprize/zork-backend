import { getCustomRepository } from "typeorm";
import { RequestsRepositories } from "../../repositories/RequestsRepositories";
import { BadRequestError, ForbiddenError } from "../../utilities/HTTPErrors";

interface IRequestRequest {
  id: string;
  self: string;
}

class RefuseRequestService {
  async execute({ id, self }: IRequestRequest) {
    const requestRepositories = getCustomRepository(RequestsRepositories);

    const request = await requestRepositories.findOne(id);

    if (request.from_id !== self && request.to_id !== self) {
      throw new ForbiddenError("This request isn't yours or isn't for you");
    }

    if (request.request_result !== null) {
      throw new BadRequestError("This request has already been completed");
    }

    if (request.request_canceled) {
      throw new BadRequestError("This request has already been canceled");
    }

    // Save request
    request.request_canceled = true;

    requestRepositories.save(request);

    return request;
  }
}

export { RefuseRequestService };
