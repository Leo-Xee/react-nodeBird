import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};

// SSR에서 Redux를 사용하기 위해서 필요
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
