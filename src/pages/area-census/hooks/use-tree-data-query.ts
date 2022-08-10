import { useQuery, QueryFunction } from "react-query";
import { Fetch, useFetch } from "shared/hooks";
import { JSONResponse } from "types";

interface SearchParams {
  id: string | undefined;
}

interface TreeNode {
  title: string;
  value: string;
  children: TreeNode[];
}
interface ApiReturn {
  treeNodeList: TreeNode[];
}

type GetQueryKey = ["area-census", SearchParams];

const getQueryKey = (params: SearchParams): GetQueryKey => [
  "area-census",
  params,
];

type GetQueryFn = (fetch: Fetch) => QueryFunction<ApiReturn, GetQueryKey>;

const getQueryFn: GetQueryFn =
  (fetch: Fetch) =>
  async ({ queryKey }) => {
    const [, { id }] = queryKey;
    const response = await fetch("/getTreeData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(id),
    });
    const parsed: JSONResponse<ApiReturn> = await response.json();
    if (parsed.code === 0) {
      return parsed.data;
    } else {
      throw parsed;
    }
  };

export default function useTreeDataQuery(params: SearchParams) {
  const fetch = useFetch();

  return useQuery({
    queryKey: getQueryKey(params),
    queryFn: getQueryFn(fetch),
  });
}
