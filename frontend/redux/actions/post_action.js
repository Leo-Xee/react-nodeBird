import { ADD_POST_REQUEST } from "./type";

export function addPostRequest(data) {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
}
