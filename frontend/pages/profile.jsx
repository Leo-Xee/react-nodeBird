import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import AppLayout from "../components/AppLayout/AppLayout";

import NicknameEditForm from "../components/NicknameEditForm/NicknameEditForm";
import FollowList from "../components/common/FollowList/FollowList";
import { loadFollowersRequest, loadFollowingsRequest } from "../redux/actions/user_action";

function profile() {
  const { myInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!myInfo) {
      Router.push("/");
      alert("로그인이 필요합니다.");
    }
  }, [myInfo]);

  useEffect(() => {
    dispatch(loadFollowingsRequest());
    dispatch(loadFollowersRequest());
  }, []);

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={myInfo.Followings} />
        <FollowList header="팔로워" data={myInfo.Followers} />
      </AppLayout>
    </>
  );
}

export default profile;
