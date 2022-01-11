import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import { createLogger } from "redux-logger";

import rootReducer from "../reducers/rootReducer";
import rootSaga from "../sagas/rootSaga";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // const loggerMiddleware = createLogger();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

// SSR에서 Redux를 사용하기 위해서 필요
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
