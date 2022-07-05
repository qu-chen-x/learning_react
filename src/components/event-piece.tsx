/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Col, Row, Checkbox } from "antd";
import { FormValues } from "pages/event-process/types";
import InfoItem from "./info-item";
import { format } from "date-fns";

interface Props {
  pieceInfo: FormValues | null;
  className?: string;
}
const handleChange = () => {};
export default function EventPiece({ pieceInfo, className }: Props) {
  return (
    <div
      css={{
        border: "1px solid lightblue",
        padding: "10px 0",
        position: "relative",
        "&:hover": {
          border: "1px solid #1890ff",
        },
      }}
      className={className}
    >
      <Row gutter={8} align="middle">
        <Col span={4}>
          <Checkbox onChange={handleChange} />
        </Col>
        <Col span={20}>
          <div>
            <InfoItem title="事务名称" value={pieceInfo?.eventName as string} />
            <InfoItem
              title="事务内容"
              value={pieceInfo?.eventContent as string}
            />
            <InfoItem
              title="任务开始时间"
              value={
                pieceInfo?.createTime
                  ? pieceInfo?.createTime[0]
                    ? format(pieceInfo.createTime[0], "yyyy-MM-dd hh:mm:ss")
                    : null
                  : null
              }
            />
            <InfoItem
              title="任务结束时间"
              value={
                pieceInfo?.createTime
                  ? pieceInfo?.createTime[1]
                    ? format(pieceInfo.createTime[1], "yyyy-MM-dd hh:mm:ss")
                    : null
                  : null
              }
            />
          </div>
        </Col>
      </Row>
      <div
        css={{
          position: "absolute",
          top: 0,
          right: 10,
          fontSize: 25,
          cursor: "pointer",
          "&:hover": {
            color: "#1890ff",
          },
        }}
      >
        X
      </div>
    </div>
  );
}
