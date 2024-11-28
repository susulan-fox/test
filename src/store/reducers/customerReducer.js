const DEFAULT_STATE = {
  customers: [], // customers harus berupa array kosong
};

export const customerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SET_CUSTOMERS":
      return { ...state, customers: action.payload };

    case "ADD_CUSTOMER":
      return {
        ...state,
        customers: [...state.customers, action.payload.customer],
      };

    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload.id
        ),
      };

    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.customer.id
            ? action.payload.customer
            : customer
        ),
      };
    default:
      return state;
  }
};
