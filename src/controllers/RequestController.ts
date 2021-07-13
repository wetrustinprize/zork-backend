import { Request, Response } from "express";
import { CreateRequestService } from "../services/CreateRequestService";

class RequestController {
  async store(req: Request, res: Response) {
    const { email, value, description } = req.body;
    const { user_id } = req;

    const createRequestService = new CreateRequestService();

    const request = await createRequestService.execute({
      email,
      value,
      description,
      from: user_id,
    });

    return res.json(request);
  }
}

export { RequestController };
