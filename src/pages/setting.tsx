/** @jsxImportSource @emotion/react */
import * as React from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import EventProcess from "./event-process";
import AdventureMap from "./adventure-map";
import AreaCensus from "./area-census";
import { map } from "lodash-es";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useRegisterTabPage } from "shared/hooks";

interface LayoutTypes extends ReactGridLayout.Layout {
  type: string;
}

interface ItemsType {
  i: string | undefined;
  x: number;
  y: any;
  w: number;
  h: number;
  type: string | undefined;
  minW?: number | undefined;
  maxW?: number | undefined;
  minH?: number | undefined;
  maxH?: number | undefined;
}

export default function Setting() {
  useRegisterTabPage("设置", "/setting", undefined, () => {});
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const onLayoutChange = (current: ReactGridLayout.Layout[]) => {
    let EUlayoutArr: LayoutTypes[] = [];
    let index: number = -1;
    current.forEach(({ i, x, y, w, h, minW, maxW, minH, maxH }) => {
      index++;
      EUlayoutArr[index] = {
        i,
        x,
        y,
        w,
        h,
        type: i,
        minW,
        maxW,
        minH,
        maxH,
      };
    });
    setItems(EUlayoutArr);
  };
  const [items, setItems] = React.useState<LayoutTypes[]>([
    {
      i: "event-process",
      x: 0,
      y: 0,
      w: 10,
      h: 10,
      type: "event-process",
    },
    {
      i: "adventure-map",
      x: 10,
      y: 0,
      w: 10,
      h: 10,
      type: "adventure-map",
    },
    {
      i: "area-census",
      x: 0,
      y: 20,
      w: 10,
      h: 10,
      type: "area-census",
    },
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateDOM = (): React.ReactNode => {
    return map(items, (l: ItemsType, i: ItemsType) => {
      let tableComponent;
      switch (l.type) {
        case "event-process":
          tableComponent = <EventProcess type={l.type} />;
          break;
        case "adventure-map":
          tableComponent = <AdventureMap type={l.type} />;
          break;
        case "area-census":
          tableComponent = <AreaCensus type={l.type} />;
          break;

        default:
          break;
      }
      return (
        <div
          key={l.i}
          data-grid={l}
          style={{
            background: "#fff",
            border: "1px solid #f5f5f5",
            overflow: "hidden",
          }}
        >
          {tableComponent}
        </div>
      );
    });
  };
  const otherContent = React.useMemo(() => {
    return (
      <ResponsiveGridLayout
        className="layout"
        // allowOverlap={true}
        // isDraggable={true} //设置可拖动
        // isResizable={true} //设置可缩放
        // autoSize={true}
        // breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        // onLayoutChange={(layout, layouts) => onLayoutChange(layout)}
        rowHeight={30}
        layouts={{ lg: items }}
        cols={{ lg: 24, md: 12, sm: 10, xs: 8, xss: 6 }}
      >
        {generateDOM()}
      </ResponsiveGridLayout>
    );
  }, [ResponsiveGridLayout, generateDOM, items]);
  return <div className="setting">{otherContent}</div>;
}
