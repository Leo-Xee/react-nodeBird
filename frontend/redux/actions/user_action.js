import {
  CHANGE_NICKNAME_REQUEST,
  FOLLOW_REQUEST,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_USER_INFO_REQUEST,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
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

export function signupRequest(data) {
  return {
    type: SIGN_UP_REQUEST,
    data,
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

export function loadUserInfoRequest() {
  return {
    type: LOAD_USER_INFO_REQUEST,
  };
}

export function changeNicknameRequest(data) {
  return {
    type: CHANGE_NICKNAME_REQUEST,
    data,
  };
}

export function loadFollowingsRequest() {
  return {
    type: LOAD_FOLLOWINGS_REQUEST,
  };
}

export function loadFollowersRequest() {
  return {
    type: LOAD_FOLLOWERS_REQUEST,
  };
}

export function removeFollowerRequest(data) {
  return {
    type: REMOVE_FOLLOWER_REQUEST,
    data,
  };
}
