import { getCustomRepository } from "typeorm";
import { RequestsRepositories } from "../../repositories/RequestsRepositories";

interface IRequestRequest {
  id: string;
  self: string;
  value: number;
}

class RedoRequestService {
  async execute({ id, self, value }: IRequestRequest) {
    if (value <= 0) {
      throw new Error("Value can't be equal or less than zero");
    }

    const requestRepositories = getCustomRepository(RequestsRepositories);

    const request = await requestRepositories.findOne(id);

    if (request.to_id !== self) {
      throw new Error("This request isn't for you");
    }

    // Set new value
    request.last_zorks = request.zorks;
    request.zorks = value;

    // Change owner and to
    const { from_id, to_id } = request;
    request.from_id = to_id;
    request.to_id = from_id;

    // Save request
    requestRepositories.save(request);

    return request;
  }
}

export { RedoRequestService };
