/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ContainerOutlined,
  QrcodeOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

interface MenuItem {
  title: string;
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: "group";
}

export default function NavigatorSection() {
  const [collapsed, setCollapsed] = useState(false);
  const menuItem: MenuItem[] = [
    {
      title: "首页",
      label: <NavLink to="/home">首页</NavLink>,
      key: "1",
      icon: <HomeOutlined />,
    },
    {
      title: "服务大厅",
      label: "服务大厅",
      key: "2",
      icon: <QrcodeOutlined />,
      children: [
        {
          title: "事务处理",
          label: <NavLink to="/service-hall/event-process">事务处理</NavLink>,
          key: "3",
          icon: <ContainerOutlined />,
        },
        {
          title: "探险地图",
          label: <NavLink to="/service-hall/adventure-map">探险地图</NavLink>,
          key: "4",
          icon: <GlobalOutlined />,
        },
      ],
    },
  ];
  return (
    <div css={{ height: "100%" }}>
      <div
        style={{
          width: 256,
          height: "100%",
          textAlign: "left",
          padding: 10,
          borderRight: "1px solid #f5f5f5",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          style={{ marginBottom: 10 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={menuItem}
          css={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
