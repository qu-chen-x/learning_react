/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { EChartsOption } from "echarts";
import AreaCharts from "./area-census/area-charts";

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

  return (
    <div
      css={{
        padding: "150px 0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AreaCharts
        title={{ text: "区域统计图" }}
        {...chartState}
        // css={{ position: "absolute", top: 20, left: 200 }}
      />
    </div>
  );
}
