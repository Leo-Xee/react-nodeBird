import produce from "immer";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
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
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
} from "../actions/type";

const initialState = {
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
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
    Followings: [{ nickname: "다현" }, { nickname: "사나" }, { nickname: "나연" }],
    Followers: [{ nickname: "다현" }, { nickname: "사나" }, { nickname: "나연" }],
  };
};

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.user = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.user = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.user.Followings.push({ id: action.data.id });
        draft.followDone = true;
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case UN_FOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UN_FOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.user.Followings = draft.user.Followings.filter((val) => val.id !== action.data.id);
        draft.unfollowDone = true;
        break;
      case UN_FOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.user.Posts.unshift({ id: action.data.id });
        break;
      case REMOVE_POST_OF_ME:
        draft.user.Posts = draft.user.Posts.filter((post) => post.id !== action.data.postId);
        break;
      default:
        return state;
    }
  });
};

export default userReducer;
