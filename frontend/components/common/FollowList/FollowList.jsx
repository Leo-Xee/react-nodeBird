import React from "react";
import PropTypes from "prop-types";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";

function FollowList({ header, data }) {
  return (
    <List
      grid={{ gutter: 4 }}
      style={{ marginTop: "20px" }}
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
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayof(PropTypes.object).isRequired,
};

export default FollowList;
