import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers/rootReducer";

const configureStore = () => {
  const middleware = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(...middleware);
  const store = createStore(rootReducer, enhancer);
  return store;
};

// SSR에서 Redux를 사용하기 위해서 필요
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
