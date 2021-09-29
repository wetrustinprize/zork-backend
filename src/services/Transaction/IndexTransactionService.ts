import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TransactionsRepositories } from "../../repositories/TransactionRepositories";

class IndexTransactionService {
  async execute(id: string) {
    const transactionRepositories = getCustomRepository(
      TransactionsRepositories
    );

    const transactions = await transactionRepositories.find({
      relations: ["from_user", "to_user"],
      where: [
        { public: true },
        { public: false, from_id: id },
        { public: false, to_id: id },
      ],
      order: { created_at: "DESC" },
    });

    return classToPlain(transactions);
  }
}

export { IndexTransactionService };
