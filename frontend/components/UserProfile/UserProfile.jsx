import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../redux/actions/user_action";

function UserProfile() {
  const dispatch = useDispatch();
  const { myInfo, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {myInfo.Posts.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {myInfo.Followings.length}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {myInfo.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{myInfo.nickname[0]}</Avatar>} title={myInfo.nickname} />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
}

export default UserProfile;
