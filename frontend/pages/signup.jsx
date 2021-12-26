import React, { useState, useCallback } from "react";
import Head from "next/head";
import { Form, Input, Button, Checkbox } from "antd";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import AppLayout from "../components/AppLayout/AppLayout";
import useInput from "../hooks/useInput";
import { signupRequest } from "../redux/actions/user_action";

const ErrorMessage = styled.div`
  color: red;
`;

function signup() {
  const [{ email, nickname, password }, onChange] = useInput({
    email: "",
    nickname: "",
    password: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [isTermError, setIsTermError] = useState(false);
  const dispatch = useDispatch();

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setIsPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setIsTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      setIsPasswordError(true);
      return;
    }
    if (!term) {
      setIsTermError(true);
      return;
    }
    const body = {
      email,
      nickname,
      password,
    };

    dispatch(signupRequest(body));
  }, [email, password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <Form.Item label="이메일" name="id">
            <Input value={email} onChange={onChange} required />
          </Form.Item>
          <Form.Item label="닉네임" name="nickname">
            <Input value={nickname} onChange={onChange} required />
          </Form.Item>
          <Form.Item label="비밀번호" name="password">
            <Input.Password value={password} onChange={onChange} required />
          </Form.Item>
          <Form.Item label="비밀번호 확인" name="passwordCheck">
            <Input.Password value={passwordCheck} onChange={onChangePasswordCheck} required />
          </Form.Item>
          {isPasswordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
          <Checkbox name="term" checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {isTermError && <ErrorMessage>약관에 동의해야합니다.</ErrorMessage>}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </AppLayout>
    </>
  );
}

export default signup;
