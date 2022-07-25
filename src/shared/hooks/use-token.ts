import * as React from "react";
import { UserContext } from "provider/user-provider";
export default function useToken() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a UserProvider");
  }
  return context?.token;
}
