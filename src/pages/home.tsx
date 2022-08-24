/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Button, Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      css={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        background: "#fff",
      }}
    >
      <Row gutter={[16, 64]}>
        <Col span={24} css={{ textAlign: "center" }}>
          <Typography>
            <Typography.Title level={4}>
              欢迎来到地球探险计划！
            </Typography.Title>
          </Typography>
        </Col>
        <Col span={24} css={{ textAlign: "center" }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                navigate("../setting", { replace: true });
                // window.open(
                //   `http://localhost:3000/setting`,
                //   "_blank",
                //   "noreferrer"
                // );
              }}
              css={{
                width: 100,
                background: "#4080FF",
                borderRadius: "22px",
              }}
            >
              设置
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                navigate("../login", { replace: true });
              }}
              css={{
                width: 100,
                background: "#4080FF",
                borderRadius: "22px",
              }}
            >
              退出
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
