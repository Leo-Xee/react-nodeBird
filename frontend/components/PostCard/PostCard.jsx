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
  retweetRequest,
  unlikePostRequest,
} from "../../redux/actions/post_action";

function PostCard({ post }) {
  const [commentOpened, setCommentOpened] = useState(false);
  const myInfo = useSelector((state) => state.user.myInfo);
  const dispatch = useDispatch();

  const onRetweet = useCallback(() => {
    if (!myInfo) return alert("로그인이 필요합니다.");
    dispatch(retweetRequest({ postId: post.id }));
  }, [myInfo]);

  const onLike = useCallback(() => {
    if (!myInfo) return alert("로그인이 필요합니다.");
    dispatch(likePostRequest({ postId: post.id }));
  }, [myInfo]);

  const onUnlike = useCallback(() => {
    if (!myInfo) return alert("로그인이 필요합니다.");
    dispatch(unlikePostRequest({ postId: post.id }));
  }, [myInfo]);

  const onToggleComment = useCallback(() => {
    setCommentOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!myInfo) return alert("로그인이 필요합니다.");
    dispatch(removePostRequest({ postId: post.id }));
  }, [myInfo]);

  const like = post.Likers.find((v) => v.id === myInfo.id);
  return (
    <>
      <Card
        style={{ marginTop: "20px" }}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="tweet" onClick={onRetweet} />,
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
                {myInfo && post.User.id === myInfo.id ? (
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
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={myInfo && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <Card.Meta
              avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
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
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
