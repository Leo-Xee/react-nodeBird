import React from "react";
import AppLayout from "../components/AppLayout/AppLayout";

import PostForm from "../components/PostForm/PostForm";
import PostCard from "../components/PostCard/PostCard";
import { useSelector } from "react-redux";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <>
      <AppLayout>
        {isLoggedIn && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
}

export default Home;
