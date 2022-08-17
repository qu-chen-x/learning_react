import { useQuery, QueryFunction } from "react-query";
import { Fetch, useFetch } from "shared/hooks";
import { JSONResponse } from "types";

interface TreeNode {
  title: string;
  value: string;
  children?: TreeNode[];
}
interface ApiReturn {
  treeNodeList: TreeNode[];
}

type GetQueryKey = ["area-census"];

const getQueryKey = (): GetQueryKey => ["area-census"];

type GetQueryFn = (fetch: Fetch) => QueryFunction<ApiReturn, GetQueryKey>;

const getQueryFn: GetQueryFn =
  (fetch: Fetch) =>
  async ({ queryKey }) => {
    const response = await fetch("/getTreeData", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const parsed: JSONResponse<ApiReturn> = await response.json();
    if (parsed.code === 0) {
      return parsed.data;
    } else {
      throw parsed;
    }
  };

export default function useTreeDataQuery() {
  const fetch = useFetch();

  return useQuery({
    queryKey: getQueryKey(),
    queryFn: getQueryFn(fetch),
  });
}
export type { TreeNode };
