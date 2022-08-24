/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { EChartsOption } from "echarts";
import AreaCharts from "./area-census/area-charts";
import { TreeSelect } from "antd";
import useTreeDataQuery, {
  TreeNode,
} from "./area-census/hooks/use-tree-data-query";
import { useRegisterTabPage } from "shared/hooks";
interface Props {
  type?: string;
}
export default function AreaCensus({ type }: Props) {
  useRegisterTabPage("区域统计", "/service-hall/area-census", type, () => {});
  const [chartState, setChartState] = useState<EChartsOption>({
    tooltip: {},
    xAxis: {},
    yAxis: {},
    series: [
      {
        type: "pie",
        data: [
          {
            value: 100,
            name: "高山",
          },
          {
            value: 300,
            name: "草原",
          },
          {
            value: 600,
            name: "海洋湖泊",
          },
        ],
      },
    ],
  });

  const [nodeValue, setNodeValue] = useState<{
    value: string;
    title: string;
  }>();

  const handleNodeValue = (
    newNode: { value: string; title: string } | undefined
  ) => {
    if (typeof newNode === "undefined") {
      setNodeValue(undefined);
    } else {
      setNodeValue({
        value: newNode.value,
        title: newNode.title,
      });
    }
  };
  const queryReturned = useTreeDataQuery();

  //遍历树形结构（循环写法）：非递归深度优先搜索
  const handleLoop = (obj: any, val: string) => {
    const stack = [];
    stack.push(obj);
    while (stack.length > 0) {
      const currentObj: any = stack.shift();
      if (currentObj === val) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return objVal;
      }
      const keys = currentObj instanceof Object ? Object.keys(currentObj) : [];
      for (const key of keys) {
        var objVal: any = currentObj[key];
        stack.unshift(objVal);
      }
    }
    return undefined;
  };

  //树形结构转化成普通的对象数组
  const handleFlatten = (
    list: TreeNode[]
  ): { title: string; value: string }[] => {
    return list?.reduce(
      (arr: TreeNode[], { title, value, children = [] }: TreeNode) =>
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        arr.concat([{ title, value }], handleFlatten(children)),
      []
    );
  };

  //遍历树形结构（递归写法）：递归深度优先搜索
  const handleTreeFilter = (treeList: TreeNode[], val: string) => {
    let newList = handleFlatten(treeList);
    let treeVal: string | undefined;
    //使用try...catch...throw Error()方法跳出forEach循环
    try {
      newList?.forEach((item) => {
        if (item.title === val) {
          treeVal = item.value;
          throw new Error("退出循环");
        } else {
          return;
        }
      });
    } catch (error: any) {
      console.log(error);
    }

    return treeVal;
  };

  return (
    <div
      css={{
        padding: "150px 0px",
        display: "flex",
        justifyContent: "space-between",
        background: "#fff",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div className="search-section" css={{ paddingTop: 20 }}>
        <TreeSelect
          style={{ width: 500, marginLeft: 20 }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select"
          treeDefaultExpandAll
          allowClear
          showSearch
          labelInValue
          onSearch={(inputVal) => {
            // let newVal = handleLoop(
            //   queryReturned.data?.treeNodeList as [],
            //   inputVal
            // );
            let newVal = handleTreeFilter(
              queryReturned.data?.treeNodeList as [],
              inputVal
            );

            console.log({ newVal });
            if (typeof newVal === "undefined") {
              return;
            } else {
              handleNodeValue({ title: inputVal, value: newVal });
            }
          }}
          value={nodeValue || undefined}
          onChange={handleNodeValue}
          treeData={queryReturned.data?.treeNodeList}
          disabled={queryReturned.isLoading}
        />
      </div>
      <div className="chart-section">
        <AreaCharts title={{ text: "区域统计图" }} {...chartState} />
      </div>
    </div>
  );
}
