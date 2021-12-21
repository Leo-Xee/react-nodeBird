import { ADD_COMMENT_REQUEST, ADD_POST_REQUEST } from "./type";

export function addPostRequest(data) {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
}

export function addCommentRequest(data) {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
}
