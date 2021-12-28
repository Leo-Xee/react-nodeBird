import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/AppLayout/AppLayout";
import PostForm from "../components/PostForm/PostForm";
import PostCard from "../components/PostCard/PostCard";
import { loadPostsRequest } from "../redux/actions/post_action";
import { loadUserInfoRequest } from "../redux/actions/user_action";

function Home() {
  const dispatch = useDispatch();
  const { hasMorePosts, mainPosts, loadPostLoading } = useSelector((state) => state.post);
  const { logInDone } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUserInfoRequest());
    dispatch(loadPostsRequest());
  }, []);

  useEffect(() => {
    function onScroll() {
      const { clientHeight, scrollHeight } = document.documentElement;
      if (hasMorePosts && !loadPostLoading) {
        if (window.scrollY + clientHeight > scrollHeight - 500) {
          dispatch(loadPostsRequest());
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostLoading]);

  return (
    <AppLayout>
      {logInDone && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export default Home;
