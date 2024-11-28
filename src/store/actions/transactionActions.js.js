export const setTransactions = (transactions) => ({
    type: "SET_TRANSACTIONS",
    payload: { transactions },
})

export function addTransaction(transaction) {
    return {
        type: "ADD_TRANSACTION",
        payload: { transaction },
    }
}