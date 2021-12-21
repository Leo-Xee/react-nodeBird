import { all, fork } from "redux-saga/effects";

import userSaga from "./user_saga";
import postSaga from "./post_saga";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
