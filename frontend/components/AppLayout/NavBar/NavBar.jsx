import React from "react";
import Link from "next/link";
import { Menu, Input } from "antd";
import styled from "styled-components";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

function NavBar() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link href="/">
          <a>노드버드</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link href="/profile">
          <a>프로필</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="search">
        <SearchInput enterButton />
      </Menu.Item>
      <Menu.Item key="signup">
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
