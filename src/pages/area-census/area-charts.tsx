/** @jsxImportSource @emotion/react */
import { useRef, useEffect } from "react";
import { EChartsType, init, EChartsOption } from "echarts";

interface Props extends EChartsOption {
  className?: string;
  extra?: React.ReactNode;
}

export default function AreaCharts({
  className,
  extra,
  ...chartOptions
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType>();

  useEffect(() => {
    if (contentRef.current !== null) {
      const newChart = (chartRef.current = init(contentRef.current, undefined, {
        renderer: "svg",
      }));

      return () => newChart.dispose();
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current !== undefined) {
        chartRef.current.resize();
      }
    });

    if (contentRef.current !== null) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (chartRef.current !== undefined) {
      chartRef.current.setOption(chartOptions);
    }
  }, [chartOptions]);

  return (
    <div
      className={className}
      ref={contentRef}
      css={{ width: 800, height: 500 }}
    >
      {extra}
    </div>
  );
}
