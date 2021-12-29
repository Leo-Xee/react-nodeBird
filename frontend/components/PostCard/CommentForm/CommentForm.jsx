import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { addCommentRequest } from "../../../redux/actions/post_action";

function CommentForm({ post }) {
  const [text, setText] = useState("");
  const id = useSelector((state) => state.user.user?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addCommentDone) {
      setText("");
    }
  }, [addCommentDone]);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    const body = {
      postId: post.id,
      userId: id,
      content: text,
    };

    dispatch(addCommentRequest(body));
  };

  return (
    <Form onFinish={onSubmit}>
      <Input.TextArea maxLength={100} rows={4} value={text} onChange={onChangeText} />
      <div>
        <Button type="primary" htmlType="submit">
          등록
        </Button>
      </div>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.objectOf(PropTypes.any),
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default CommentForm;
