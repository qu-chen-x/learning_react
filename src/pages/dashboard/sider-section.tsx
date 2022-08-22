/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import LogoImg from "./images/logo.png";
import useFilteredRoutesByAuth from "./sider-section/hooks/use-filtered-routes-by-auth";
import MenuView from "./menu-view";
import React from "react";
// import myRoutes from "routes";
interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SiderSection({ setCollapsed, collapsed }: Props) {
  const theme = useTheme();
  const routes = useFilteredRoutesByAuth();
  const ToggleIcon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;

  return (
    <nav
      css={{
        height: "100%",
        borderRight: "1px solid #eee",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        css={{
          height: theme.headerHeight,
          padding: "0px 24px",
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "nowrap",
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        <h2 css={{ marginTop: 20 }}>地球探险计划</h2>
        <div css={{ width: 20, height: 20, textAlign: "center", marginTop: 5 }}>
          <img src={LogoImg} alt="" css={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <MenuView routes={routes} collapsed={collapsed} />
      <div
        css={{
          height: theme.headerHeight,
          padding: collapsed ? "0 32px" : "0 24px",
          flexShrink: 0,
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          transition: "padding linear 100ms",
        }}
        onClick={() => {
          setCollapsed((pev) => !pev);
        }}
      >
        <ToggleIcon />
      </div>
    </nav>
  );
}
