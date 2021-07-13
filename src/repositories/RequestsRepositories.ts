import { EntityRepository, Repository } from "typeorm"
import { Request } from "../entities/Request";

@EntityRepository(Request)
class RequestsRepositories extends Repository<Request> {}

export { RequestsRepositories }
