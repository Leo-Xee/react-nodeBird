import React from "react";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../redux/store/configureStore";

function _App({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <Component />
    </>
  );
}

export default wrapper.withRedux(_App);
