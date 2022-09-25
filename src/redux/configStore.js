import myReducer from "../reducers";

import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../saga/rootSaga";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const sageMiddleware = createSagaMiddleware();

const configStore = () => {
  const middleware = [sageMiddleware];
  const enhancers = [applyMiddleware(...middleware)];
  const store = createStore(myReducer, composeEnhancers(...enhancers));
  sageMiddleware.run(rootSaga);
  return store;
};

export default configStore;
