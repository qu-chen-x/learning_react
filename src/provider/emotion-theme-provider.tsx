import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import modifiedThemeVariables from "../styles/theme.json";
const aggregatedThemeVariables = {
  ...modifiedThemeVariables,
  headerHight: 56,
  navWidth: 260,
  contentBackgroundColor: "#f5f6f7",
  pagePadding: {
    top: 14,
    bottom: 0,
    left: 14,
    right: 14,
  },
};
type AugmentedTheme = typeof aggregatedThemeVariables;
declare module "@emotion/react" {
  export interface Theme extends AugmentedTheme {}
}
interface Props {
  children: React.ReactNode;
}
function EmotionThemeProvider({ children }: Props) {
  return (
    <ThemeProvider theme={aggregatedThemeVariables}>{children}</ThemeProvider>
  );
}
export default EmotionThemeProvider;
