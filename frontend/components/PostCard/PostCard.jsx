import React, { useState, useCallback } from "react";
import Proptypes from "prop-types";
import { Avatar, Button, Card, Popover } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from "@ant-design/icons";

import PostImages from "./PostImages/PostImages";
import PostCardContent from "./PostCardContent/PostCardContent";
import CommentForm from "./CommentForm/CommentForm";
import { useSelector } from "react-redux";

function PostCard({ post }) {
  const [like, setLike] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);
  const id = useSelector((state) => state.user.user?.id);

  const onToggleLike = useCallback(() => {
    setLike((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentOpened((prev) => !prev);
  }, []);

  return (
    <>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="tweet" />,
          like ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),

          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
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
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentOpened && (
        <>
          <CommentForm />
        </>
      )}
    </>
  );
}

PostCard.propTypes = {
  post: Proptypes.shape({
    id: Proptypes.number,
    User: Proptypes.object,
    content: Proptypes.string,
    createdAt: Proptypes.object,
    Comment: Proptypes.arrayOf(Proptypes.any),
    Image: Proptypes.arrayOf(Proptypes.any),
  }),
};

export default PostCard;
