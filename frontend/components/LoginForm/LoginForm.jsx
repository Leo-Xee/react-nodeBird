import React, { useCallback, useEffect } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import Router from "next/router";
import { loginRequest } from "../../redux/actions/user_action";
import useInput from "../../hooks/useInput";

function LoginForm() {
  const [{ email, password }, onChange] = useInput({ email: "", password: "" });
  const { logInLoading, logInError, myInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  useEffect(() => {
    if (myInfo) {
      Router.push("/");
    }
  }, [myInfo]);

  const onSubmitHandler = useCallback(() => {
    dispatch(loginRequest({ email, password }));
  }, [email, password]);

  return (
    <div>
      <Form onFinish={onSubmitHandler}>
        <Form.Item label="이메일" name="email">
          <Input type="email" value={email} onChange={onChange} required />
        </Form.Item>
        <Form.Item label="비밀번호" name="password">
          <Input.Password value={password} onChange={onChange} required />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={logInLoading}>
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
