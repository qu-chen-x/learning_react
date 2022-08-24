/** @jsxImportSource @emotion/react */
import * as React from "react";
import SiderSection from "./dashboard/sider-section";
import ContentSection from "./dashboard/content-section";
import { Layout } from "antd";
import { useTheme } from "@emotion/react";
import { useLocation } from "react-router-dom";

export default function DashBoard() {
  const theme = useTheme();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div
      css={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexWrap: "nowrap",
        position: "relative",
      }}
    >
      <Layout.Sider
        collapsed={collapsed}
        width={theme.navWidth}
        css={{
          background: "#fff",
        }}
      >
        <SiderSection collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout.Sider>
      <div
        css={{
          flex: "auto",
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 1140,
        }}
      >
        <ContentSection />
      </div>
    </div>
  );
}
