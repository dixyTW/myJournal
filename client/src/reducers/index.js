import errorReducer from './errorReducer'
import authReducer from './authReducer'
import entryReducer from './entryReducers'
import { combineReducers } from 'redux'

export default combineReducers ({
    error: errorReducer,
    auth: authReducer,
    entry: entryReducer
})