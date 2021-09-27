import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TransactionsRepositories } from "../../repositories/TransactionRepositories";

class IndexSelfTransactionsService {
  async execute(id: string) {
    const transactionRepository = getCustomRepository(TransactionsRepositories);

    const transactions = transactionRepository.find({
      relations: ["from_user", "to_user"],
      order: { created_at: "DESC" },
      where: [
        {
          from_id: id,
        },
        {
          to_id: id,
        },
      ],
    });

    return classToPlain(transactions);
  }
}

export { IndexSelfTransactionsService };
