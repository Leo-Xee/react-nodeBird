import React from "react";
import PropTypes from "prop-types";

function AppLayout({ children }) {
  return (
    <div>
      <div>Nav</div>
      {children}
    </div>
  );
}

AppLayout.PropTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
