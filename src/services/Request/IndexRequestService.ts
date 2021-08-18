import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { RequestsRepositories } from "../../repositories/RequestsRepositories";

interface IRequestRequest {
  self: string;
}

class IndexRequestService {
  async execute({ self }: IRequestRequest) {
    const requestRepositories = getCustomRepository(RequestsRepositories);

    const requests = await requestRepositories.find({
      where: [
        {
          from_id: self,
        },
        { to_id: self },
      ],
    });

    return classToPlain(requests);
  }
}

export { IndexRequestService };
