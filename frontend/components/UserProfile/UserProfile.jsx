import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../redux/actions/user_action";

function UserProfile() {
  const dispatch = useDispatch();
  const { user, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  return (
    <>
      <Card
        actions={[
          <div key="twit">
            짹짹
            <br />
            {user.Posts.length}
          </div>,
          <div key="following">
            팔로잉
            <br />
            {user.Followings.length}
          </div>,
          <div key="follower">
            팔로워
            <br />
            {user.Followers.length}
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{user.nickname[0]}</Avatar>}
          title={user.nickname}
        />
        <Button onClick={onLogOut} loading={logOutLoading}>
          로그아웃
        </Button>
      </Card>
    </>
  );
}

export default UserProfile;
