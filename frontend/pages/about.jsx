import React from "react";
import Head from "next/head";
import { Card, Avatar } from "antd";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../components/AppLayout/AppLayout";
import wrapper from "../redux/store/configureStore";
import { loadUserInfoRequest } from "../redux/actions/user_action";

function About() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>{userInfo.nickname}님의 프로필</title>
      </Head>
      <Card
        actions={[
          <div key="twit">
            짹짹
            <br />
            {userInfo.Posts.length}
          </div>,
          <div key="following">
            팔로잉
            <br />
            {userInfo.Followings.length}
          </div>,
          <div key="follower">
            팔로워
            <br />
            {userInfo.Followers.length}
          </div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
      </Card>
    </AppLayout>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(loadUserInfoRequest(1));

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default About;
