import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import Thunk from 'redux-thunk'

import appReducer from "./app-reducer"
import authReducer from "./auth-reducer"
import todosReducer from "./todos-reducer"


let rootReducer = combineReducers({
   app: appReducer,

   auth: authReducer,
   todos: todosReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(Thunk)))

window.__store__ = store

export default store