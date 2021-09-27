import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TransactionsRepositories } from "../../repositories/TransactionRepositories";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { BadRequestError } from "../../utilities/HTTPErrors";

class IndexTransactionByUserService {
  async execute(authenticatedID: string, otherID: string) {
    if (authenticatedID == otherID) {
      throw new BadRequestError("User's can't be the same");
    }

    if (!otherID) {
      throw new BadRequestError("Other user can't be empty");
    }

    const usersRepostiory = getCustomRepository(UsersRepositories);

    const otherUser = await usersRepostiory.findOne(otherID);

    if (!otherUser) {
      throw new BadRequestError("Invalid user ID");
    }

    const transactionRepository = getCustomRepository(TransactionsRepositories);

    const transactions = await transactionRepository.find({
      relations: ["from_user", "to_user"],
      order: { created_at: "DESC" },
      where: [
        {
          from_id: authenticatedID,
          to_id: otherID,
        },
        {
          from_id: otherID,
          to_id: authenticatedID,
        },
      ],
    });

    return classToPlain(transactions);
  }
}

export { IndexTransactionByUserService };
