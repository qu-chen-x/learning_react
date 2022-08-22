import * as React from "react";
import { DispatchWrapper } from "./types";
const PageTabsDispatchContext = React.createContext<DispatchWrapper>(
  undefined!
);
PageTabsDispatchContext.displayName = "PageTabsDispatchContext";
export default PageTabsDispatchContext;
