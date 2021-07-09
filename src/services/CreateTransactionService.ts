import { getCustomRepository } from "typeorm";
import { TransactionsRepositories } from "../repositories/TransactionRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface ITransactionRequest {
  email: string;
  value: number;
  from: string;
  description?: string;
  is_public?: boolean;
}

class CreateTransactionService {
  async execute({
    email,
    value,
    from,
    description = "",
    is_public = true,
  }: ITransactionRequest) {
    const usersRepostiories = getCustomRepository(UsersRepositories);
    const transactionRepositories = getCustomRepository(
      TransactionsRepositories
    );

    // Check if "to" User exists
    const toUser = await usersRepostiories.findOne({ email });

    if (!toUser) {
      throw new Error("Invalid user");
    }

    // Check if "from" has enough Zorks
    const fromUser = await usersRepostiories.findOne(from);
    if (fromUser.zorks < value) {
      throw new Error("You don't have enough Zorks");
    }

    // Create transaction
    const transaction = transactionRepositories.create({
      from_id: fromUser.id,
      to_id: toUser.id,
      zorks: value,
      public: is_public,
      description,
    });

    // Remove zorks "from"
    fromUser.zorks -= +value;

    // Add zorks "to"
    toUser.zorks += +value;

    // Save repositories
    await usersRepostiories.save([toUser, fromUser]);
    await transactionRepositories.save(transaction);

    return transaction;
  }
}

export { CreateTransactionService };
