import { Button, Form, Input } from "antd";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostRequest, removeImage, uploadImagesRequest } from "../../redux/actions/post_action";

function PostForm() {
  const { addPostLoading, addPostDone, imagePaths } = useSelector((state) => state.post);
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

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch(uploadImagesRequest(imageFormData));
  });

  const onRemoveImage = useCallback(
    (idx) => () => {
      dispatch(removeImage(idx));
    },
    [],
  );

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }
    const formData = new FormData();
    imagePaths.forEach((v) => {
      formData.append("image", v);
    });
    formData.append("content", text);
    dispatch(addPostRequest(formData));
  }, [text, imagePaths]);

  return (
    <Form encType="multipart/form-data" onFinish={onSubmit}>
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
        <input type="file" onChange={onChangeImages} multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" htmlType="submit" loading={addPostLoading}>
          트윗
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        {imagePaths.map((v, idx) => (
          <div key={v}>
            <img
              src={`http://localhost:5000/${v}`}
              alt={v}
              style={{ width: "100px", height: "100px" }}
            />
            <div>
              <Button onClick={onRemoveImage(idx)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
      <div />
    </Form>
  );
}

export default PostForm;
