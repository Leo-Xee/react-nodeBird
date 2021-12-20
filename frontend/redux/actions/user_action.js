import { LOG_IN_REQUEST, LOG_OUT_REQUEST } from "../reducers/user_reducer";

export function loginRequest(data) {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
}

export function logoutRequest() {
  return {
    type: LOG_OUT_REQUEST,
  };
}
