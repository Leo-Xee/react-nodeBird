import Head from "next/head";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import AppLayout from "../components/AppLayout/AppLayout";

import NicknameEditForm from "../components/NicknameEditForm/NicknameEditForm";
import FollowList from "../components/common/FollowList/FollowList";

function profile() {
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      Router.push("/");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={user.Followings} />
        <FollowList header="팔로워 목록" data={user.Followers} />
      </AppLayout>
    </>
  );
}

export default profile;
