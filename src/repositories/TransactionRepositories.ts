import { EntityRepository, Repository } from "typeorm";
import { Transaction } from "../entities/Transaction";

@EntityRepository(Transaction)
class TransactionsRepositories extends Repository<Transaction> {}

export { TransactionsRepositories };
