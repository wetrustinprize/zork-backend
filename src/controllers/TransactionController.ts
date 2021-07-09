import { Request, Response } from "express";
import { CreateTransactionService } from "../services/CreateTransactionService";

class TransactionController {
  async store(req: Request, res: Response) {
    const { email, value, description } = req.body;
    const { user_id } = req;
    const createTransactionService = new CreateTransactionService();

    const transaction = await createTransactionService.execute({
      email,
      value,
      from: user_id,
      description,
    });

    return res.json(transaction);
  }
}

export { TransactionController };
