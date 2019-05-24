import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/reducers";
import { reValidation } from "../middleware/filter";
import thunk from 'redux-thunk'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reValidation, thunk)));
export default store;
