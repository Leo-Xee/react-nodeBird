import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import useInput from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../redux/actions/user_action";

function LoginForm() {
  const [{ id, password }, onChange] = useInput({ id: "", password: "" });
  const dispatch = useDispatch();

  const onSubmitHandler = useCallback(() => {
    console.log(id, password);
    dispatch(loginRequest({ id, password }));
  }, [id, password]);

  return (
    <div>
      <Form onFinish={onSubmitHandler}>
        <Form.Item label="아이디" name="id">
          <Input value={id} onChange={onChange} required />
        </Form.Item>
        <Form.Item label="비밀번호" name="password">
          <Input.Password value={password} onChange={onChange} required />
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
