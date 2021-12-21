import shortId from "shortid";
import produce from "immer";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
} from "../actions/type";

const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "레오",
      },
      content: "첫 번째 포스트 #해시태그#리액트#리덕스",
      Images: [
        {
          src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
          src: "https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
        },
        {
          src: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "다현",
          },
          content: "멋있어요",
        },
        {
          User: {
            nickname: "나연",
          },
          content: "좋아해요",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostError: null,
  addPostDone: false,
  removePostLoading: false,
  removePostError: null,
  removePostDone: false,
  addCommentLoading: false,
  addCommentError: null,
  addCommentDone: false,
};

const dummyPost = (data) => {
  return {
    id: data.id,
    User: { id: 1, nickname: "레오" },
    content: data.content,
    Images: [],
    Comments: [],
  };
};

const dummyComment = (data) => {
  return {
    id: shortId.generate(),
    User: { id: 1, nickname: "레오" },
    content: data.content,
  };
};

const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostError = null;
        draft.addPostDone = false;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.err;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostError = null;
        draft.removePostDone = false;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((post) => post.id !== action.data.postId);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        draft.addCommentDone = false;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((post) => post.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
      default:
        return state;
    }
  });
};

export default postReducer;
