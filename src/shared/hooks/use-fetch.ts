import * as React from "react";
import { useLogout } from "shared/hooks";
import useToken from "./use-token";
import fetchWrapper, { FetchWrapper } from "fetch";
import {
  PersistentAuthInformation,
  refreshToken as originalRefreshToken,
  switchRole as originalSwitchRole,
} from "auth-provider";

let refreshTokenRequest: Promise<PersistentAuthInformation> | null = null;

type ResponseError = {
  status: number;
};
function isResponseError(error: unknown): error is ResponseError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as Record<string, unknown>).status === "number"
  );
}
export default function useFetch() {
  const token = useToken();
  const logout = useLogout();
  return React.useCallback<FetchWrapper>(
    async (input, init = {}) => {
      const newHeaders = new Headers(init.headers);
      if (refreshTokenRequest) {
        const user = await refreshTokenRequest;
        newHeaders.append("token", user.token);
      } else {
        newHeaders.append("token", token ?? "");
      }
      try {
        return await fetchWrapper(input, { ...init, headers: newHeaders });
      } catch (error) {
        if (isResponseError(error) && error.status === 401) {
          logout();
        }
        throw error;
      }
    },
    [logout, token]
  );
}

const refreshToken = async () => {
  refreshTokenRequest = originalRefreshToken();
  try {
    await refreshTokenRequest;
  } catch {
    refreshTokenRequest = null;
  }
  return refreshTokenRequest;
};

const switchRole = async (roleId: string) => {
  refreshTokenRequest = originalSwitchRole(roleId);
  try {
    await refreshTokenRequest;
  } catch {
    refreshTokenRequest = null;
  }
  return refreshTokenRequest;
};
export { refreshToken, switchRole, refreshTokenRequest };
export type { FetchWrapper as Fetch };
