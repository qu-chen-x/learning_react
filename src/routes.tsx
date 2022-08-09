import * as React from "react";
import type { RouteObject } from "react-router-dom";

import NoMatch from "pages/no-match";
import { HomeOutlined } from "@ant-design/icons";

const NavigatorPage = React.lazy(
  () => import(/*webpackPrefetch:true */ "pages/navigator-page")
);
const Login = React.lazy(() => import(/*webpackPrefetch:true */ "pages/login"));
const Home = React.lazy(() => import(/*webpackPrefetch:true */ "pages/home"));
const ServiceHall = React.lazy(
  () => import(/*webpackPrefetch:true */ "pages/service-hall")
);
const EventProcess = React.lazy(
  () => import(/*webpackPrefetch:true */ "pages/event-process")
);

const AdventureMap = React.lazy(
  () => import(/*webpackPrefetch:true */ "pages/adventure-map")
);

const AreaCensus = React.lazy(
  () => import(/*webpackPrefetch:true */ "pages/area-census")
);

interface CustomRouteObject extends RouteObject {
  navName: string;
  authCode?: string;
  isHide?: boolean;
  isMenu?: boolean;
  Icon?: React.ReactElement;
  children?: CustomRouteObject[];
}
const myRoutes: CustomRouteObject[] = [
  {
    path: "/",
    navName: "控制台",
    element: <NavigatorPage />,
    children: [
      {
        index: true,
        path: "home",
        Icon: <HomeOutlined />,
        navName: "首页",
        element: <Home />,
      },
      {
        path: "service-hall",
        navName: "服务大厅",
        element: <ServiceHall />,
        children: [
          {
            path: "event-process",
            navName: "计划处理",
            element: <EventProcess />,
          },
          {
            path: "adventure-map",
            navName: "探险地图",
            element: <AdventureMap />,
          },
          {
            path: "area-census",
            navName: "区域统计",
            element: <AreaCensus />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    navName: "登录",
    element: <Login />,
  },
  {
    path: "*",
    navName: "404页面",
    element: <NoMatch />,
  },
];
export default myRoutes;
export type { CustomRouteObject };
