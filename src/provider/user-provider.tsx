import * as React from "react";
import useInterval from "use-interval";
import * as authProvider from "auth-provider";
import { useAuth } from "query";
import { refreshToken } from "shared/hooks/use-fetch";
interface Props {
  children: React.ReactNode;
}
const UserContext =
  React.createContext<authProvider.PersistentAuthInformation | null>(
    undefined!
  );
UserContext.displayName = "UserContext";
//从页面发起的请求到达服务器的估计时间   time unit:millisecond
const UNSAFE_REQUEST_TIME = 1000;
//在token过期前多久去刷新token       time unit:minutes
const REFRESH_TOKEN_HOLD = 4;
function UserProvider({ children }: Props) {
  const userQueryReturn = useAuth();
  /**
   * 1.如果没有登录信息，不会定时去刷新 token
   * 2.如果有登录信息，但刷新的请求可能来不及到达服务器，也不会去刷新 token
   * 3.计算刷新 token 定时器的时间 = token过期时间 - 现在时间 - 刷新提前量，如果计算出来的定时器时间少于等于0，则马上刷新
   */
  const [refreshTokenInterval, immediate] = (function getUserIntervalParams(): [
    number | null,
    boolean
  ] {
    if (!userQueryReturn.data?.expiredAt) {
      return [null, false];
    } else if (
      Date.now() + UNSAFE_REQUEST_TIME >=
      userQueryReturn.data?.expiredAt
    ) {
      return [null, false];
    } else {
      const interval =
        userQueryReturn.data?.expiredAt -
        Date.now() -
        100 * 60 * REFRESH_TOKEN_HOLD;
      return [
        interval <= 0 ? userQueryReturn.data?.expiredAt - Date.now() : interval,
        interval < 0 ? true : false,
      ];
    }
  })();
  useInterval(
    async () => {
      await refreshToken();
      userQueryReturn.refetch();
    },
    refreshTokenInterval,
    immediate
  );
  if (userQueryReturn.isLoading || userQueryReturn.isIdle) {
    return <div>加载中</div>;
  }
  if (userQueryReturn.isError) {
    return <div>加载错误</div>;
  }
  if (userQueryReturn.isSuccess) {
    return (
      <UserContext.Provider value={userQueryReturn.data}>
        {children}
      </UserContext.Provider>
    );
  }
  return null;
}
export default UserProvider;
export { UserContext };
