import { Button, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCommentRequest } from "../../../redux/actions/post_action";

function CommentForm({ post }) {
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.user);
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
    console.log(post.id, user.id, text);

    const body = {
      postId: post.id,
      userId: user.id,
      content: text,
    };

    dispatch(addCommentRequest(body));
  };

  return (
    <Form onFinish={onSubmit}>
      <Input.TextArea
        maxLength={100}
        rows={4}
        value={text}
        onChange={onChangeText}
      />
      <div>
        <Button type="primary" htmlType="submit">
          등록
        </Button>
      </div>
    </Form>
  );
}

export default CommentForm;
