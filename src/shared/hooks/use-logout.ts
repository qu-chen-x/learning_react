import * as React from "react";
import useUpdateAuth from "./use-update-auth";
import { logout } from "auth-provider";
export default function useLogout() {
  const updateAuth = useUpdateAuth();
  return React.useCallback(async () => {
    await logout();
    updateAuth();
  }, [updateAuth]);
}
