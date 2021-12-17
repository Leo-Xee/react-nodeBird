import { Form, Input } from "antd";
import React from "react";
import styled from "styled-components";

const styledForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
`;

function NicknameEditForm() {
  return (
    <styledForm>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </styledForm>
  );
}

export default NicknameEditForm;
