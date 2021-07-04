import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./Reducers/rootReducer.js";

export const configure = ()=>{
    const store = createStore(rootReducer,process.env.NODE_ENV==='production'? applyMiddleware(thunk):composeWithDevTools(applyMiddleware(thunk,logger)));
    return store;
}