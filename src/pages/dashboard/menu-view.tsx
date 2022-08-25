/** @jsxImportSource @emotion/react */
import * as React from "react";

import { css } from "@emotion/react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { CustomRouteObject } from "routes";

const navItemStyle = css({
  //在给元素加样式，请注意伪类的顺序https://developer.mozilla.org/en-US/docs/Web/CSS/:active
  "&:link": {},
  "&:visited": {},
  "&:hover": {},
  "&:active": {},
});
interface Props {
  routes: CustomRouteObject[];
  collapsed: boolean;
}

export default function MenuView({ routes, collapsed }: Props) {
  const location = useLocation();

  const renderMenuItem = (
    icon?: React.ReactNode,
    key?: string,
    title?: string
  ) => {
    return (
      <Menu.Item icon={icon} key={key}>
        <NavLink to={{ pathname: key }} css={[navItemStyle]}>
          {title}
        </NavLink>
      </Menu.Item>
    );
  };

  const renderMenu = (routes: CustomRouteObject[], parentPath: string[]) => {
    return (
      <>
        {routes.map((dashboardRoute) => {
          const key = `${parentPath.length > 0 ? "/" : ""}${parentPath.join(
            "/"
          )}${dashboardRoute.path ? "/" + dashboardRoute.path : "/"}`;
          return dashboardRoute.children === undefined ? (
            <React.Fragment key={key}>
              {dashboardRoute.isHide
                ? null
                : renderMenuItem(
                    dashboardRoute.Icon,
                    key,
                    dashboardRoute.navName
                  )}
            </React.Fragment>
          ) : (
            <React.Fragment key={key}>
              {dashboardRoute.isMenu ? (
                renderMenuItem(dashboardRoute.Icon, key, dashboardRoute.navName)
              ) : (
                <Menu.SubMenu
                  key={key}
                  title={dashboardRoute.navName}
                  icon={dashboardRoute.Icon}
                >
                  {renderMenu(dashboardRoute.children, [
                    ...parentPath,
                    dashboardRoute.path as string,
                  ])}
                </Menu.SubMenu>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      css={{
        overflowX: "hidden",
        overflowY: "hidden",
        flex: 1,
        // overflowX: "auto",
        // overflowY: "auto",
        "&& .ant-menu-inline": {
          background: "#fff",
        },
        "&& .ant-menu-title-content": {
          fontSize: 14,
        },
        "&& .ant-menu-sub .ant-menu-title-content": {
          fontSize: 14,
        },
        "&& .ant-menu-item::after": {
          right: "auto",
          left: 0,
          borderRightWidth: 4,
        },
      }}
      inlineCollapsed={!collapsed}
    >
      {renderMenu(routes, [])}
    </Menu>
  );
}
