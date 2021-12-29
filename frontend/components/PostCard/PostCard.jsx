import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Card, Comment, List, Popover } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import PostImages from "./PostImages/PostImages";
import PostCardContent from "./PostCardContent/PostCardContent";
import CommentForm from "./CommentForm/CommentForm";
import FollowButton from "./FollowButton/FollowButton";
import {
  likePostRequest,
  removePostRequest,
  unlikePostRequest,
} from "../../redux/actions/post_action";

function PostCard({ post }) {
  const [commentOpened, setCommentOpened] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const onLike = useCallback(() => {
    if (!user) return alert("로그인이 필요합니다.");
    dispatch(likePostRequest({ postId: post.id }));
  }, [user]);

  const onUnlike = useCallback(() => {
    if (!user) return alert("로그인이 필요합니다.");
    dispatch(unlikePostRequest({ postId: post.id }));
  }, [user]);

  const onToggleComment = useCallback(() => {
    setCommentOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePostRequest({ postId: post.id }));
  }, []);

  const like = post.Likers.find((v) => v.id === user.id);
  return (
    <>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="tweet" />,
          like ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {user && post.User.id === user.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={user && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.objectOf(PropTypes.any),
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    Likers: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
