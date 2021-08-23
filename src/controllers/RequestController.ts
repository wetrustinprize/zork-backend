import { Request, Response } from "express";
import { AcceptRequestService } from "../services/Request/AcceptRequestService";
import { CreateRequestService } from "../services/Request/CreateRequestService";
import { RefuseRequestService } from "../services/Request/RefuseRequestService";
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

  async method(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req;
    const { method, value } = req.body;

    // Accept request
    if (method == "accept") {
      const acceptRequestService = new AcceptRequestService();
      const request = await acceptRequestService.execute({
        self: user_id,
        id,
      });

      return res.json(request);
    }

    // Refuse request
    if (method == "refuse") {
      const refuseRequestService = new RefuseRequestService();
      const request = await refuseRequestService.execute({ self: user_id, id });

      return res.json(request);
    }

    throw new Error("Uknown method");
  }
}

export { RequestController };
