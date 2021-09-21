import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TransactionsRepositories } from "../../repositories/TransactionRepositories";

class IndexTransactionService {
  async execute() {
    const transactionRepositories = getCustomRepository(
      TransactionsRepositories
    );

    const transactions = await transactionRepositories.find({
      relations: ["from_user", "to_user"],
      order: { created_at: "DESC" },
    });

    return classToPlain(transactions);
  }
}

export { IndexTransactionService };
