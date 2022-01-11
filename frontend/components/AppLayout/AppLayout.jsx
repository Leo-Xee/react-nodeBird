import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

import NavBar from "./NavBar/NavBar";

function AppLayout({ children }) {
  return (
    <main style={{ backgroundColor: "#fafafa" }}>
      <NavBar />
      <Row gutter={16} style={{ margin: "16px" }}>
        <Col xs={24} md={6} xl={8} />
        <Col xs={24} md={12} xl={8}>
          {children}
        </Col>
        <Col xs={24} md={6} xl={8} />
      </Row>
    </main>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
