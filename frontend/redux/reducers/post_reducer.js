import shortId from "shortid";
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
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostError: null,
        addPostDone: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostError: null,
        removePostDone: false,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: [
          ...state.mainPosts.filter((post) => post.id !== action.data.postId),
        ],
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentError: null,
        addCommentDone: false,
      };
    case ADD_COMMENT_SUCCESS:
      {
        const postIdx = state.mainPosts.findIndex(
          (post) => post.id === action.data.postId,
        );
        const post = { ...state.mainPosts[postIdx] };
        post.Comments = [dummyComment(action.data), ...post.Comments];
        const mainPosts = [...state.mainPosts];
        mainPosts[postIdx] = post;
      }
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default postReducer;
