import Head from "next/head";
import React from "react";
import AppLayout from "../components/AppLayout/AppLayout";

import NicknameEditForm from "../components/NicknameEditForm/NicknameEditForm";
import FollowList from "../components/common/FollowList/FollowList";

const dummy = [{ nickname: "나연" }, { nickname: "사나" }, { nickname: "다현" }];

function profile() {
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={dummy} />
        <FollowList header="팔로워 목록" data={dummy} />
      </AppLayout>
    </>
  );
}

export default profile;
