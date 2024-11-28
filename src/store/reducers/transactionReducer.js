// const DEFAULT_STATE = {
//     transactions: []
// };

// export const transactionReducer = (state = DEFAULT_STATE, action) => {
//     switch (action.type) {
//         case "SET_TRANSACTIONS":
//             // console.log(state.transactions);
//             return { ...state, transactions: action.payload.transactions };

//         case "ADD_TRANSACTION":
//             // console.log(state.transactions);
//             return { ...state, transactions: [...state.transactions, action.payload.transaction] };

//         default:
//             return state;
//     }
// }


const DEFAULT_STATE = {
    transactions: {}
};

export const transactionReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_TRANSACTIONS":
            return { ...state, transactions: action.payload.transactions };

        case "ADD_TRANSACTION":
            const { transaction } = action.payload;
            const customerId = transaction.customer.id;

            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    [customerId]: {
                        ...state.transactions[customerId],
                        transactions: [
                            ...state.transactions[customerId].transactions,
                            transaction
                        ],
                        transactionCount: state.transactions[customerId].transactionCount + 1
                    }
                }
            };

        default:
            return state;
    }
};
