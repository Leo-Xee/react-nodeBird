import React from "react";
import Link from "next/link";
import { Menu, Input } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

function NavBar() {
  const { myInfo } = useSelector((state) => state.user);

  return (
    <Menu mode="horizontal" style={{ display: "flex", justifyContent: "center" }}>
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
      {!myInfo && (
        <Menu.Item key="login">
          <Link href="/login">
            <a>로그인</a>
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default NavBar;
