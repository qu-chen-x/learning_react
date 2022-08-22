import * as React from "react";
import type { RouteObject } from "react-router-dom";

import NoMatch from "pages/no-match";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { RequireLogin } from "shared/components";
import Dashboard from "pages/dashboard";

const Login = React.lazy(() => import(/*webpackPrefetch:true */ "pages/login"));
const Home = React.lazy(() => import(/*webpackPrefetch:true */ "pages/home"));

const EventProcess = React.lazy(
  () => import(/*webpackPrefetch:true */ "pages/event-process")
);

const AdventureMap = React.lazy(
  () => import(/*webpackPrefetch:true */ "pages/adventure-map")
);

const AreaCensus = React.lazy(
  () => import(/*webpackPrefetch:true */ "pages/area-census")
);

const bypassCode = process.env.REACT_APP_BYPASS_AUTH_CODE as string;
interface CustomRouteObject extends RouteObject {
  navName: string;
  authCode: string;
  isHide?: boolean;
  isMenu?: boolean;
  Icon?: React.ReactElement;
  children?: CustomRouteObject[];
}
const myRoutes: CustomRouteObject[] = [
  {
    path: "/",
    navName: "控制台",
    authCode: "",
    element: <Dashboard />,
    // <RequireLogin>
    //   <Dashboard />
    // </RequireLogin>
    children: [
      {
        index: true,
        Icon: <HomeOutlined />,
        navName: "首页",
        authCode: bypassCode,
        element: <Home />,
      },
      {
        path: "service-hall",
        navName: "服务大厅",
        Icon: <AppstoreOutlined />,
        authCode: bypassCode,
        children: [
          {
            path: "event-process",
            navName: "计划处理",
            authCode: bypassCode,
            element: <EventProcess />,
          },
          {
            path: "adventure-map",
            navName: "探险地图",
            authCode: bypassCode,
            element: <AdventureMap />,
          },
          {
            path: "area-census",
            navName: "区域统计",
            authCode: bypassCode,
            element: <AreaCensus />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    navName: "登录",
    authCode: "",
    element: <Login />,
  },
  {
    path: "*",
    navName: "404页面",
    authCode: "",
    element: <NoMatch />,
  },
];
export default myRoutes;
export type { CustomRouteObject };
