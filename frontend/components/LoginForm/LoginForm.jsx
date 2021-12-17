import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";

function LoginForm({ setIsLoggedIn }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitHandler = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <div>
      <Form onFinish={onSubmitHandler}>
        <Form.Item label="아이디" name="userId">
          <Input value={id} onChange={onChangeId} required />
        </Form.Item>
        <Form.Item label="비밀번호" name="userPassword">
          <Input.Password value={password} onChange={onChangePassword} required />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
          <Button type="default">
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
