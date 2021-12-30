import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { followRequest, unfollowRequest } from "../../../redux/actions/user_action";

function FollowButton({ post }) {
  const dispatch = useDispatch();
  const { user, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isMe = user.id === post.User.id;
  const isFollowing = user?.Followings.find((val) => val.id === post.User.id);

  const onFollow = useCallback(() => {
    const body = {
      id: post.User.id,
    };

    if (isFollowing) {
      dispatch(unfollowRequest(body));
    } else {
      dispatch(followRequest(body));
    }
  }, [isFollowing]);

  if (isMe) return null;
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onFollow}>
      {isFollowing ? "UnFollow" : "Follow"}
    </Button>
  );
}

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.objectOf(PropTypes.any),
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default FollowButton;
