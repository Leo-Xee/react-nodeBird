import React from "react";
import { Card, Avatar, Button } from "antd";

function UserProfile({ setIsLoggedIn }) {
  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Card
        actions={[
          <div key="twit">
            짹짹
            <br />0
          </div>,
          <div key="following">
            팔로잉
            <br />0
          </div>,
          <div key="follower">
            팔로워
            <br />0
          </div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>JM</Avatar>} title="JangMin" />
        <Button onClick={onLogOut}>로그아웃</Button>
      </Card>
    </>
  );
}

export default UserProfile;
