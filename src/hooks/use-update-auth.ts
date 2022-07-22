import * as React from "react";
import { useQueryClient } from "react-query";
import { userKey } from "query-keys";
export default function useUpdateAuth() {
  const queryClient = useQueryClient();
  return React.useCallback(() => {
    queryClient.invalidateQueries(userKey);
  }, [queryClient]);
}
