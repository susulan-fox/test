export const setCustomers = (customers) => {
    return {
        type: "SET_CUSTOMERS",
        payload: customers,
    }
};

export const addCustomer = (customer) => {
    return {
        type: "ADD_CUSTOMER",
        payload: customer,
    }
};

export const deleteCustomer = (id) => {
    return {
        type: "DELETE_CUSTOMER",
        payload: id,
    }
};

export const updateCustomer = (customer) => {
    return {
        type: "UPDATE_CUSTOMER",
        payload: customer,
    }
};