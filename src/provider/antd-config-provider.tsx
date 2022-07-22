import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "./antd-config-provider/antd.css";

interface Props {
  children: React.ReactNode;
}
function AntdConfigProvider({ children }: Props) {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
}
export default AntdConfigProvider;
