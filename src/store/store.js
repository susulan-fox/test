import {combineReducers} from 'redux'
import {authReducer} from './reducers/authReducers.js'
import { productReducer } from './reducers/productReducer.js'
import { transactionReducer } from './reducers/transactionReducer'
import { customerReducer } from './reducers/customerReducer.js'

export const reducers = combineReducers({
    auth: authReducer,
    transaction: transactionReducer,
    product: productReducer,
    customer: customerReducer
})

export default reducers