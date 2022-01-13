import React, { useEffect } from "react";
import axios from "axios";
import { END } from "redux-saga";

import { useSelector } from "react-redux";
import { Head } from "next/document";
import { useRouter } from "next/router";
import wrapper from "../../redux/store/configureStore";
import { loadMyInfoRequest } from "../../redux/actions/user_action";
import AppLayout from "../../components/AppLayout/AppLayout";
import PostCard from "../../components/PostCard/PostCard";
import { loadPostRequest } from "../../redux/actions/post_action";

const Post = () => {
  const { singlePost, loadPostError } = useSelector((state) => state.post);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (loadPostError) {
      return alert(loadPostError);
    }
  }, [loadPostError]);

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0] ? singlePost.Images[0].src : "https://nodebird.com/favicon.ico"
          }
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
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
