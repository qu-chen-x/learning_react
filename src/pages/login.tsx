/** @jsxImportSource @emotion/react */

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import LoginBg from "./login/assets/login_bg.png";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import { FormItemLabelProps } from "antd/lib/form/FormItemLabel";

interface FormValueType {
  userName: string;
  password: string;
}
const shareItemProps: Pick<FormItemLabelProps, "labelAlign" | "labelCol"> = {
  labelAlign: "left",
  labelCol: { span: 6 },
};
const formSchema = yup.object({
  userName: yup.string().required("请输入账号"),
  password: yup.string().required("请输入密码"),
});
export default function Login() {
  let navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: FormValueType) => {
    console.log({ data });
    if (data.userName !== "admin") {
      message.warning("账号错误，请重新输入账号！");
      return;
    }
    if (data.password !== "123456") {
      message.warning("密码错误，请重新输入密码！");
      return;
    }
    navigate("../home", { replace: true });
  };

  return (
    <div
      className="App"
      css={{
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        background: `url(${LoginBg}) no-repeat`,
        position: "relative",
      }}
    >
      <div
        css={{
          width: 350,
          height: 250,
          background: "rgb(255,255,255,0.2)",
          padding: 20,
          position: "absolute",
          top: "35%",
          left: "42%",
        }}
      >
        <Row gutter={8}>
          <Col span={24}>
            <Typography
              css={{
                marginBottom: 20,
                "& .ant-typography": {
                  background: "linear-gradient(to right,lightblue, #1890ff)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textAlign: "center",
                },
              }}
            >
              <Typography.Title level={4}>
                欢迎来到地球探险计划！
              </Typography.Title>
            </Typography>
          </Col>
          <Col
            span={24}
            css={{
              "& .ant-col.ant-form-item-label": {
                label: {
                  color: "#fff",
                },
              },
            }}
          >
            <Controller
              control={control}
              name="userName"
              render={({ field, fieldState }) => (
                <Form.Item
                  label="账号"
                  required
                  validateStatus={fieldState.error ? "error" : "success"}
                  help={fieldState.error?.message}
                  {...shareItemProps}
                >
                  <Input {...field} placeholder="请输入您的账号" allowClear />
                </Form.Item>
              )}
            />
          </Col>
          <Col
            span={24}
            css={{
              "& .ant-col.ant-form-item-label": {
                label: {
                  color: "#fff",
                },
              },
            }}
          >
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Form.Item
                  label="密码"
                  required
                  validateStatus={fieldState.error ? "error" : "success"}
                  help={fieldState.error?.message}
                  {...shareItemProps}
                >
                  <Input.Password
                    {...field}
                    placeholder="请输入您的密码"
                    allowClear
                  />
                </Form.Item>
              )}
            />
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit(onSubmit)}
              css={{
                width: "100%",
                background: "#4080FF",
                borderRadius: "22px",
              }}
            >
              登录
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
