import {
  ADD_COMMENT_REQUEST,
  ADD_POST_REQUEST,
  LIKE_POST_REQUEST,
  LOAD_POSTS_REQUEST,
  REMOVE_IMAGE,
  REMOVE_POST_REQUEST,
  RETWEET_REQUEST,
  UNLIKE_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
} from "./type";

export function loadPostsRequest() {
  return {
    type: LOAD_POSTS_REQUEST,
  };
}

export function addPostRequest(data) {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
}

export function removePostRequest(data) {
  return {
    type: REMOVE_POST_REQUEST,
    data,
  };
}

export function addCommentRequest(data) {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
}

export function likePostRequest(data) {
  return {
    type: LIKE_POST_REQUEST,
    data,
  };
}

export function unlikePostRequest(data) {
  return {
    type: UNLIKE_POST_REQUEST,
    data,
  };
}

export function uploadImagesRequest(data) {
  return {
    type: UPLOAD_IMAGES_REQUEST,
    data,
  };
}

export function removeImage(data) {
  return {
    type: REMOVE_IMAGE,
    data,
  };
}

export function retweetRequest(data) {
  return {
    type: RETWEET_REQUEST,
    data,
  };
}
