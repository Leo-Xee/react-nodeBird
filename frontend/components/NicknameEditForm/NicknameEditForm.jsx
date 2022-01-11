import React, { useCallback } from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { changeNicknameRequest } from "../../redux/actions/user_action";

function NicknameEditForm() {
  const [{ nickname }, onChange] = useInput({ nickname: "" });
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameRequest({ nickname }));
  }, [nickname]);

  return (
    <Form style={{ marginTop: "20px", border: "1px solid #d9d9d9" }}>
      <Input.Search
        id="nickname"
        value={nickname}
        addonBefore="닉네임"
        enterButton="수정"
        onChange={onChange}
        onSearch={onSubmit}
      />
    </Form>
  );
}

export default NicknameEditForm;
