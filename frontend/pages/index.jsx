import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/AppLayout/AppLayout";
import PostForm from "../components/PostForm/PostForm";
import PostCard from "../components/PostCard/PostCard";
import { loadPostsRequest } from "../redux/actions/post_action";
import { loadUserInfoRequest } from "../redux/actions/user_action";

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
    dispatch(loadUserInfoRequest());
    dispatch(loadPostsRequest());
  }, []);

  useEffect(() => {
    function onScroll() {
      const { clientHeight, scrollHeight } = document.documentElement;
      if (hasMorePosts && !loadPostLoading) {
        if (window.scrollY + clientHeight > scrollHeight - 500) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          console.log(lastId);
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

export default Home;
