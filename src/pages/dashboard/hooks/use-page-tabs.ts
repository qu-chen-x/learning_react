import * as React from "react";
import { PageTabRecord, Actions, State } from "../types";

type CallbackMap = Map<string, () => void>;
export default function usePageTabs() {
  const tabRemovedCallbackMapRef = React.useRef<CallbackMap>();
  const getRemovedCallbackMap = (): CallbackMap => {
    if (tabRemovedCallbackMapRef.current) {
      return tabRemovedCallbackMapRef.current;
    } else {
      return (tabRemovedCallbackMapRef.current = new Map());
    }
  };
  const [state, dispatch] = React.useReducer(
    (state: PageTabRecord[], actions: Actions): PageTabRecord[] => {
      switch (actions.type) {
        case "addTab":
          if (!state.find((record) => record.path === actions.payload.path)) {
            return [
              ...state,
              { path: actions.payload.path, name: actions.payload.name },
            ];
          }
          return state;
        case "removeTab":
          if (actions.payload.path === "/") return state;
          return state.filter((record) => record.path !== actions.payload.path);
        default:
          const _neverActions: never = actions;
          throw Error("不支持action类型" + _neverActions);
      }
    },
    [{ name: "首页", path: "/" }]
  );

  const dispatchWrapper = React.useCallback(
    (actions: Actions, options?: { onRemove?: () => void }) => {
      switch (actions.type) {
        case "addTab":
          if (typeof options?.onRemove === "function") {
            const callbackMap = getRemovedCallbackMap();
            callbackMap.set(actions.payload.path, options.onRemove);
          }
          break;
        case "removeTab":
          const callbackMap = getRemovedCallbackMap();
          const path = actions.payload.path;
          const callback = callbackMap.get(path);
          if (typeof callback === "function") {
            callback();
            callbackMap.delete(path);
          }
      }
      dispatch(actions);
    },
    []
  );

  return [state, dispatchWrapper] as const;
}
export type { PageTabRecord, Actions, State };
