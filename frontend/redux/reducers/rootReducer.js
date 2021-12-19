import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import user from "./user_reducer";
import post from "./post_reducer";

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
