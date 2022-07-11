/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Col, Row, Checkbox } from "antd";
import { format } from "date-fns";

import { FormValues, ModeType } from "pages/event-process/types";
import InfoItem from "./info-item";

interface Props {
  pieceInfo: FormValues[];
  className?: string;
  mode: ModeType;
  handleOne: (e: any, item: FormValues, mode: ModeType) => void;
  handleDelete: (item: FormValues, mode: ModeType) => void;
}

export default function EventPiece({
  pieceInfo,
  className,
  handleOne,
  handleDelete,
  mode,
}: Props) {
  return (
    <>
      {pieceInfo.length === 0
        ? "Nothing"
        : pieceInfo.map((item, index) =>
            mode === item.mode ? (
              <div
                key={index}
                css={{
                  marginTop: index > 0 ? 10 : 0,
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
                    <Checkbox
                      onChange={(e) => handleOne(e, item, mode)}
                      checked={item.isChecked}
                    />
                  </Col>
                  <Col span={20}>
                    <div>
                      <InfoItem
                        title="事务名称"
                        value={item?.eventName as string}
                      />
                      <InfoItem
                        title="事务内容"
                        value={item?.eventContent as string}
                      />
                      <InfoItem
                        title="任务开始时间"
                        value={
                          item?.createTime
                            ? item?.createTime[0]
                              ? format(
                                  item.createTime[0],
                                  "yyyy-MM-dd hh:mm:ss"
                                )
                              : null
                            : null
                        }
                      />
                      <InfoItem
                        title="任务结束时间"
                        value={
                          item?.createTime
                            ? item?.createTime[1]
                              ? format(
                                  item.createTime[1],
                                  "yyyy-MM-dd hh:mm:ss"
                                )
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
                  onClick={() => handleDelete(item, mode)}
                >
                  X
                </div>
              </div>
            ) : null
          )}
    </>
  );
}
