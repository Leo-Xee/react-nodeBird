import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";

import axios from "axios";
import AppLayout from "../components/AppLayout/AppLayout";
import PostForm from "../components/PostForm/PostForm";
import PostCard from "../components/PostCard/PostCard";
import { loadPostsRequest } from "../redux/actions/post_action";
import { loadUserInfoRequest } from "../redux/actions/user_action";
import wrapper from "../redux/store/configureStore";

function Home() {
  const dispatch = useDispatch();
  const { hasMorePosts, mainPosts, loadPostLoading, retweetError } = useSelector(
    (state) => state.post,
  );
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      const { clientHeight, scrollHeight } = document.documentElement;
      if (hasMorePosts && !loadPostLoading) {
        if (window.scrollY + clientHeight > scrollHeight - 500) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPostsRequest(lastId));
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      {user && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

// 프론트 서버에서 Pre-rendering 하는 부분
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch(loadUserInfoRequest());
  store.dispatch(loadPostsRequest());
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Home;
