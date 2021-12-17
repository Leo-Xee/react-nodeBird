import React from "react";
import AppLayout from "../components/AppLayout/AppLayout";
import Head from "next/head";

function index() {
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <AppLayout>
        <div>Hello World!!</div>
      </AppLayout>
    </>
  );
}

export default index;
