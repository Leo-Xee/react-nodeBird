import React from "react";
import { Form, Input } from "antd";

function NicknameEditForm() {
  return (
    <Form style={{ marginBottom: "20px", border: "1px solid #d9d9d9" }}>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
}

export default NicknameEditForm;
