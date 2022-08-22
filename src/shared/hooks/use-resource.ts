import * as React from "react";
import { UserContext } from "../../provider/user-provider";
export default function useResource() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useResource must be used within a UserProvider");
  }
  return context.modules;
}
