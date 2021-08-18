import { Request, Response } from "express";
import { AcceptRequestService } from "../services/Request/AcceptRequestService";
import { CreateRequestService } from "../services/Request/CreateRequestService";
import { FindRequestService } from "../services/Request/FindRequestService";
import { IndexRequestService } from "../services/Request/IndexRequestService";

class RequestController {
  async store(req: Request, res: Response) {
    const { email, value, description } = req.body;
    const { user_id } = req;

    const createRequestService = new CreateRequestService();

    const request = await createRequestService.execute({
      email,
      value,
      description,
      self: user_id,
    });

    return res.json(request);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req;

    const findRequestService = new FindRequestService();

    const request = await findRequestService.execute({ id, self: user_id });

    return res.json(request);
  }

  async index(req: Request, res: Response) {
    const { user_id } = req;

    const indexRequestService = new IndexRequestService();

    const request = await indexRequestService.execute({ self: user_id });

    return res.json(request);
  }

  async accept(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req;

    const acceptRequestService = new AcceptRequestService();

    const request = await acceptRequestService.execute({
      self: user_id,
      id,
    });

    return res.json(request);
  }
}

export { RequestController };
