import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UN_FOLLOW_REQUEST,
  UN_FOLLOW_SUCCESS,
  UN_FOLLOW_FAILURE,
} from "../actions/type";

const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  user: null,
  signUpData: {},
  loginDate: {},
};

const dummyUser = (data) => {
  return {
    ...data,
    nickname: "레오",
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [
      { nickname: "다현" },
      { nickname: "사나" },
      { nickname: "나연" },
    ],
    Followers: [
      { nickname: "다현" },
      { nickname: "사나" },
      { nickname: "나연" },
    ],
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInError: false,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        user: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutError: false,
        logOutDone: false,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        user: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case FOLLOW_REQUEST:
      return {
        ...state,
        followLoading: true,
        followError: false,
        followDone: false,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        followLoading: false,
        followDone: true,
      };
    case FOLLOW_FAILURE:
      return {
        ...state,
        followLoading: false,
        followError: action.error,
      };
    case UN_FOLLOW_REQUEST:
      return {
        ...state,
        unfollowLoading: true,
        unfollowError: false,
        unfollowDone: false,
      };
    case UN_FOLLOW_SUCCESS:
      return {
        ...state,
        unfollowLoading: false,
        unfollowDone: true,
      };
    case UN_FOLLOW_FAILURE:
      return {
        ...state,
        unfollowLoading: false,
        unfollowError: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
