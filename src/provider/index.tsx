import ReactQueryProvider from "./react-query-provider";
import { BrowserRouter } from "react-router-dom";
import EmotionThemeProvider from "./emotion-theme-provider"; //全局css样式管理
import AntdConfigProvider from "./antd-config-provider";
import UserProvider from "./user-provider"; //用于在更新用户的相关信息时同步至全局

interface Props {
  children?: React.ReactNode;
}
function AppProvider({ children }: Props) {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <EmotionThemeProvider>
          <AntdConfigProvider>
            <UserProvider>{children}</UserProvider>
          </AntdConfigProvider>
        </EmotionThemeProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}
export default AppProvider;
