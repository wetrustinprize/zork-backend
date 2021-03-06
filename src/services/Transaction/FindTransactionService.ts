import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TransactionsRepositories } from "../../repositories/TransactionRepositories";
import { BadRequestError, ForbiddenError } from "../../utilities/HTTPErrors";

interface ITransactionRequest {
  transaction_id: string;
  user_id: string;
}

class FindTransactionService {
  async execute({ transaction_id, user_id }: ITransactionRequest) {
    const transactionsRepositories = getCustomRepository(
      TransactionsRepositories
    );

    const transaction = await transactionsRepositories.findOne({
      where: { id: transaction_id },
      relations: ["from_user", "to_user"],
    });
    // verify if transaction exists
    if (!transaction) {
      throw new BadRequestError("Invalid transaction ID");
    }

    // verify if transaction is public and the user isn't neither the receiver or sender
    if (
      !transaction.public &&
      transaction.from_id != user_id &&
      transaction.to_id
    ) {
      throw new ForbiddenError("You can't see this transaction");
    }

    // return transaction
    return classToPlain(transaction);
  }
}

export { FindTransactionService };
