/** @jsxImportSource @emotion/react */
import { Button, Col, Row, Typography } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  const handleOut = () => {
    navigate("../login", { replace: true });
  };
  return (
    <div
      css={{
        width: "100%",
        height: "100vh",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleOut();
            }}
            css={{
              width: 300,
              background: "#4080FF",
              borderRadius: "22px",
            }}
          >
            退出
          </Button>
        </Col>
      </Row>
    </div>
  );
}
