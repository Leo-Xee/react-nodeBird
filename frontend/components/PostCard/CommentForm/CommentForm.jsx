import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function CommentForm({ post }) {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user);

  console.log(user);
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    console.log(post.id, userId, text);
    setText("");
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
