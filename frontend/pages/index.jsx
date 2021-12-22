import React from "react";
import { useSelector } from "react-redux";

import AppLayout from "../components/AppLayout/AppLayout";
import PostForm from "../components/PostForm/PostForm";
import PostCard from "../components/PostCard/PostCard";

function Home() {
  const { logInDone } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
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
