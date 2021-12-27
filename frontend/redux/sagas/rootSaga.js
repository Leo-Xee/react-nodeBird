import { all, fork } from "redux-saga/effects";
import axios from "axios";

import userSaga from "./user_saga";
import postSaga from "./post_saga";

axios.defaults.baseURL = "http://localhost:5000";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
