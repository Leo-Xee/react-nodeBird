import { Button, Form, Input } from "antd";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostRequest } from "../../redux/actions/post_action";

function PostForm() {
  const { addPostLoading, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const imageInput = useRef();

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  });

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = () => {
    dispatch(addPostRequest({ content: text }));
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
        <Button type="primary" htmlType="submit" loading={addPostLoading}>
          트윗
        </Button>
      </div>
      <div />
    </Form>
  );
}

export default PostForm;
