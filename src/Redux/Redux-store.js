import {applyMiddleware, combineReducers, createStore} from "redux";
import Reducer from "./Reducer";
import thunkMiddleware from"redux-thunk"

let reducers = combineReducers({
    Reducer:Reducer
    }
);

const store = createStore(reducers,applyMiddleware(thunkMiddleware))

window.store = store;

export default store;