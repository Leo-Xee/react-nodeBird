import React from "react";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../redux/store/configureStore";

function App({ Component }) {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <meta charSet="UTF-8" />
      </Head>
      <Component />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
