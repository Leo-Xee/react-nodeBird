import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";

import axios from "axios";
import { useRouter } from "next/router";
import AppLayout from "../../components/AppLayout/AppLayout";
import PostCard from "../../components/PostCard/PostCard";
import { loadHashtagPostsRequest } from "../../redux/actions/post_action";
import { loadMyInfoRequest } from "../../redux/actions/user_action";
import wrapper from "../../redux/store/configureStore";

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { hasMorePosts, mainPosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    function onScroll() {
      const { clientHeight, scrollHeight } = document.documentElement;
      if (hasMorePosts && !loadPostsLoading) {
        if (window.scrollY + clientHeight > scrollHeight - 500) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadHashtagPostsRequest({ lastId, tag }));
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts, tag]);

  return (
    <AppLayout>
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

// 프론트 서버에서 Pre-rendering 하는 부분
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch(loadMyInfoRequest());
  store.dispatch(loadHashtagPostsRequest({ tag: params.tag }));
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Hashtag;
