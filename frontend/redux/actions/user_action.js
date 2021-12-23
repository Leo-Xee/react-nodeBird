import {
  FOLLOW_REQUEST,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  SIGN_UP_REQUEST,
  UN_FOLLOW_REQUEST,
} from "./type";

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

export function signupRequest() {
  return {
    type: SIGN_UP_REQUEST,
  };
}

export function followRequest(data) {
  return {
    type: FOLLOW_REQUEST,
    data,
  };
}

export function unfollowRequest(data) {
  return {
    type: UN_FOLLOW_REQUEST,
    data,
  };
}
