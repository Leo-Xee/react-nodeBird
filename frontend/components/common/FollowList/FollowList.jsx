import React from "react";
import PropTypes from "prop-types";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeFollowerRequest, unfollowRequest } from "../../../redux/actions/user_action";

function FollowList({ header, data }) {
  const dispatch = useDispatch();

  const onCancel = (id) => () => {
    if (header === "팔로잉") {
      dispatch(unfollowRequest({ id }));
    } else {
      dispatch(removeFollowerRequest({ id }));
    }
  };

  return (
    <List
      grid={{ gutter: 4 }}
      style={{ marginTop: "20px", backgroundColor: "#ffffff" }}
      header={<div>{header}</div>}
      loadMore={
        <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center" }}>
          <Button>더보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: "10px" }}>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FollowList;
