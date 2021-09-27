import { Request, Response } from "express";
import { CreateTransactionService } from "../services/Transaction/CreateTransactionService";
import { FindTransactionService } from "../services/Transaction/FindTransactionService";
import { IndexSelfTransactionsService } from "../services/Transaction/IndexSelfTransactionsService";
import { IndexTransactionByUserService } from "../services/Transaction/IndexTransactionsByUserService";
import { IndexTransactionService } from "../services/Transaction/IndexTransactionService";

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

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const { user_id } = req;

    const findTransactionService = new FindTransactionService();

    const transaction = await findTransactionService.execute({
      transaction_id: id,
      user_id,
    });

    return res.json(transaction);
  }

  async index(req: Request, res: Response) {
    const { user } = req.params;
    const { user_id } = req;

    if (!user) {
      const indexTransactionService = new IndexTransactionService();

      const transactions = await indexTransactionService.execute();

      return res.json(transactions);
    } else {
      if (user == "self") {
        const indexSelfTransactionService = new IndexSelfTransactionsService();

        const transaction = await indexSelfTransactionService.execute(user_id);

        return res.json(transaction);
      } else {
        const indexTransactionByUserService =
          new IndexTransactionByUserService();

        const transactions = await indexTransactionByUserService.execute(
          user_id,
          user
        );

        return res.json(transactions);
      }
    }
  }
}

export { TransactionController };
