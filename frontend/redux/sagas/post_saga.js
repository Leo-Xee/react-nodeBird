import { all, delay, put, takeLatest, fork } from "redux-saga/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_TO_ME,
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../actions/type";
import shortid from "shortid";

function* addPost(action) {
  const postId = shortid.generate();
  try {
    console.log("saga addPost");
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id: postId,
        content: action.data.content,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: {
        id: postId,
      },
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: action.response.err,
    });
  }
}

function* removePost(action) {
  try {
    console.log("saga removePost");
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: action.response.err,
    });
  }
}

function* addComment(action) {
  try {
    console.log("saga addComment");
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: action.response.err,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
