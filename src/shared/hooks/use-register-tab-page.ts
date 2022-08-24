import * as React from "react";
import PageTabsDispatchContext from "pages/dashboard/page-tabs-dispatch-context";
// import usePathKey from "./use-path-key";
export default function useRegisterTabPage(
  name: string,
  path: string,
  type?: string,
  onRemove?: () => void
) {
  const dispatch = React.useContext(PageTabsDispatchContext);
  const onRemoveRef = React.useRef(onRemove);
  React.useEffect(() => {
    onRemoveRef.current = onRemove;
  }, [onRemove]);
  // const pathKey = usePathKey();
  if (dispatch === undefined) {
    throw new Error(
      "useRegisterTabPage must be used within a PaeTabsDispatchContext.Provider"
    );
  }
  React.useEffect(() => {
    if (typeof type !== "undefined") return;
    dispatch(
      {
        type: "addTab",
        payload: {
          // path: pathKey,
          path,
          name,
        },
      },
      {
        onRemove: onRemoveRef.current,
      }
    );
  }, [dispatch, name, path, type]);
}
