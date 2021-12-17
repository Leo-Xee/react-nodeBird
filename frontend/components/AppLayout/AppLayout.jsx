import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import NavBar from "./NavBar/NavBar";
import LoginForm from "../LoginForm/LoginForm";

import UserProfile from "../UserProfile/UserProfile";

function AppLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavBar />
      <Row gutter={16} style={{ margin: "16px" }}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          Right Menu
        </Col>
      </Row>
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
