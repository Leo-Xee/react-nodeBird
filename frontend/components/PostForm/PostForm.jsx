import { Button, Form, Input } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/actions/post_action";

function PostForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const imageInput = useRef();

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  });

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = () => {
    dispatch(addPost());
    setText("");
    console.log(text);
  };

  return (
    <Form onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        maxLength={100}
        onChange={onChangeText}
        placeholder="오늘 어떤 일이 있었나요?"
      />
      <div
        style={{
          margin: "10px auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" htmlType="submit">
          트윗
        </Button>
      </div>
      <div></div>
    </Form>
  );
}

export default PostForm;
