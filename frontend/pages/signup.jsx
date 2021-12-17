import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout/AppLayout";

function signup() {
  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <div>SignUpPage</div>
      </AppLayout>
    </>
  );
}

export default signup;
