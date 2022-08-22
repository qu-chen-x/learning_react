/** @jsxImportSource @emotion/react */
import * as React from "react";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, Avatar, Dropdown, Menu, message } from "antd";
import {
  DownOutlined,
  PoweroffOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useTheme } from "@emotion/react";
// import {useQueryClient} from 'react-query'
import usePageTabs, { State } from "./hooks/use-page-tabs";
import PageTabsDispatchContext from "./page-tabs-dispatch-context";
// import { useLogout } from "shared/hooks";
// import { useAuth } from "query";

const defaultPaneKey = "/";

const getActiveKey = (pageTabs: State, fullPath: string) => {
  return pageTabs.find((record) => record.path === fullPath)
    ? fullPath
    : defaultPaneKey;
};

export default function ContentSection() {
  const theme = useTheme();
  const [pageTabs, pageTabsDispatch] = usePageTabs();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <PageTabsDispatchContext.Provider value={pageTabsDispatch}>
      <div
        css={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Tabs
          tabBarGutter={12}
          type="editable-card"
          hideAdd
          destroyInactiveTabPane
          activeKey={getActiveKey(
            pageTabs,
            location.pathname + location.search
          )}
          onEdit={(targetKey, action) => {
            if (typeof targetKey !== "string") return;
            if (action === "add") return;
            pageTabsDispatch({
              type: "removeTab",
              payload: { path: targetKey },
            });
            const currentPath =
              pageTabs[pageTabs.findIndex((v) => v.path === targetKey) - 1]
                .path;
            navigate(currentPath);
          }}
          onTabClick={(key) => {
            navigate(key);
          }}
          css={{
            height: theme.headerHeight,
            flex: "0 0 auto",
            "&&& .ant-tabs-tab": {
              border: "none",
              backgroundColor: "rgba(0,0,0,0)",
              borderRadius: "16px 16px 0 0",
              position: "relative",
              "&::after, &::before": {
                content: '""',
                position: "absolute",
                bottom: 0,
                width: 32,
                height: 16,
                transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);",
              },
              "&::after": {
                left: "100%",
                borderBottomLeftRadius: 16,
              },
              "&::before": {
                right: "100%",
                borderBottomRightRadius: 16,
              },
              "&-active": {
                backgroundColor: theme.contentBackgroundColor,
                ".ant-tabs-tab-btn": {
                  color: theme.primaryColor,
                },
                "&::before": {
                  boxShadow: `9px 0 0 0 ${theme.contentBackgroundColor}`,
                },
                "&::after": {
                  boxShadow: `-9px 0 0 0 ${theme.contentBackgroundColor}`,
                },
              },
            },
            "&&& .ant-tabs-nav-list": {
              marginLeft: 10,
            },
            ".ant-tabs-nav": {
              marginBottom: 0,
              userSelect: "none",
              height: theme.headerHeight,
            },
            "&& .ant-tabs-nav-wrap": {
              alignSelf: "end",
            },
            "&& .ant-tabs-nav-operations": {
              alignSelf: "end",
            },
            ".ant-tabs-content-holder": {
              overflow: "auto",
              paddingTop: 4,
            },
            "&&& .ant-tabs-tab-with-remove": {
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",

              ".ant-tabs-tab-remove": {
                width: 1,
                height: 1,
                opacity: 0,
                margin: 0,
                padding: 0,
                overflow: "hidden",
              },
              "&:hover .ant-tabs-tab-remove": {
                width: "auto",
                height: "auto",
                opacity: 1,
                margin: "0 -4px 0 8px",
                padding: "1px 6px",
                color: theme.primaryColor,
              },
              // 下面的css为了去掉“首页”tab上的删除按钮
              "&:first-of-type .ant-tabs-tab-remove": {
                display: "none",
              },
            },
          }}
        >
          {pageTabs.map((pane) => (
            <Tabs.TabPane key={pane.path} tab={pane.name} />
          ))}
        </Tabs>
        <div
          css={{
            height: `calc(100% - ${theme.headerHeight}px)`,
            padding: `${theme.pagePadding.top}px ${theme.pagePadding.right}px ${theme.pagePadding.bottom}px ${theme.pagePadding.left}px`,
            backgroundColor: theme.contentBackgroundColor,
            flexShrink: 0,
            flexGrow: 0,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: 10,
            },

            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },

            "&::-webkit-scrollbar-thumb": {
              background: "#888",
            },

            "&::webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          <React.Suspense fallback={<span>出错了！</span>}>
            <Outlet />
          </React.Suspense>
        </div>
      </div>
    </PageTabsDispatchContext.Provider>
  );
}
