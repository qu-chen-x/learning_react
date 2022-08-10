/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { EChartsOption } from "echarts";
import AreaCharts from "./area-census/area-charts";
import { TreeSelect } from "antd";
import useTreeDataQuery from "./area-census/hooks/use-tree-data-query";

export default function AreaCensus() {
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

  const [nodeValue, setNodeValue] = useState<string>();

  const handleNodeValue = (newValue: string) => {
    setNodeValue(newValue);
  };
  const queryReturned = useTreeDataQuery({
    id: nodeValue,
  });

  return (
    <div
      css={{
        padding: "150px 0px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="search-section" css={{ paddingTop: 20 }}>
        <TreeSelect
          style={{ width: 500 }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select"
          treeDefaultExpandAll
          allowClear
          value={nodeValue}
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
