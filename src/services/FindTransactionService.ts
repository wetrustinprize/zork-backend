import { getCustomRepository } from "typeorm"
import { TransactionsRepositories } from "../repositories/TransactionRepositories"

interface ITransactionRequest {
    transaction_id: string,
    user_id: string
}

class FindTransactionService {
    async execute({transaction_id, user_id}: ITransactionRequest) {
        const transactionsRepositories = getCustomRepository(TransactionsRepositories)

        const transaction = await transactionsRepositories.findOne(transaction_id)
        // verify if transaction exists
        if(!transaction) {
            throw new Error("Invalid transaction ID")
        }

        // verify if transaction is public and the user isn't neither the receiver or sender
        if(!transaction.public && transaction.from_id != user_id && transaction.to_id) {
            throw new Error("Not permited")
        }

        // return transaction
        return transaction

    }
}

export { FindTransactionService }
