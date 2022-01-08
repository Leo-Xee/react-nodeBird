import React, { useEffect } from "react";
import axios from "axios";
import { END } from "redux-saga";

import { useSelector } from "react-redux";
import wrapper from "../../redux/store/configureStore";
import { loadMyInfoRequest } from "../../redux/actions/user_action";
import AppLayout from "../../components/AppLayout/AppLayout";
import PostCard from "../../components/PostCard/PostCard";
import { loadPostRequest } from "../../redux/actions/post_action";

const Post = () => {
  const { singlePost, loadPostError } = useSelector((state) => state.post);

  useEffect(() => {
    if (loadPostError) {
      return alert(loadPostError);
    }
  }, [loadPostError]);

  return (
    <AppLayout>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch(loadMyInfoRequest());
  store.dispatch(loadPostRequest(params.id));
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Post;
