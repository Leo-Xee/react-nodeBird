import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { END } from "redux-saga";
import axios from "axios";

import { Head } from "next/document";
import { Card, Avatar } from "antd";
import AppLayout from "../../components/AppLayout/AppLayout";
import PostCard from "../../components/PostCard/PostCard";
import { loadUserPostsRequest } from "../../redux/actions/post_action";
import { loadMyInfoRequest, loadUserInfoRequest } from "../../redux/actions/user_action";
import wrapper from "../../redux/store/configureStore";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { hasMorePosts, mainPosts, loadPostLoading, retweetError } = useSelector(
    (state) => state.post,
  );
  const { userInfo, myInfo } = useSelector((state) => state.user);

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
          dispatch(loadUserPostsRequest({ id, lastId }));
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostLoading, mainPosts, id]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>{userInfo.nickname}님의 글</title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo && userInfo.id !== myInfo.id ? (
        <Card
          style={{ marginBottom: 20 }}
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      ) : null}
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
  store.dispatch(loadUserInfoRequest({ id: params.id }));
  store.dispatch(loadUserPostsRequest({ id: params.id }));
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default User;
