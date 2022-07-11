/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Card, Checkbox, Col, Radio, Row, Space, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { ModeType } from "pages/event-process/types";

interface Props {
  title?: string;
  checked: boolean;
  children?: React.ReactNode;
  className?: string;
  radioValue: string | undefined;
  setRadioValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleAll: (e: CheckboxChangeEvent, mode: ModeType) => void;
  handleSure: (mode: ModeType) => void;
}
export default function EventModule({
  className,
  children,
  title,
  checked,
  handleAll,
  handleSure,
  radioValue,
  setRadioValue,
}: Props) {
  const mode =
    title === "Todo" ? "todo" : title === "Working" ? "working" : "done";
  return (
    <Card className={className} title={title}>
      <Row gutter={[8, 16]}>
        <Col span={24}> {children}</Col>
        <Col span={24} css={{ borderTop: "1px solid #ddd", paddingTop: 20 }}>
          <Row gutter={8}>
            <Col span={8}>
              <Checkbox
                checked={checked}
                onChange={(e) => handleAll(e, mode)}
                // indeterminate={checked}
              >
                全选
              </Checkbox>
            </Col>
            <Col span={8}>
              <Radio.Group
                onChange={(e) => {
                  setRadioValue(e.target.value);
                }}
                value={radioValue}
              >
                {mode === "todo" ? (
                  <Space>
                    <Radio value={"working"}>Working</Radio>
                    <Radio value={"done"}>Done</Radio>
                  </Space>
                ) : mode === "working" ? (
                  <Space>
                    <Radio value={"todo"}>Todo</Radio>
                    <Radio value={"done"}>Done</Radio>
                  </Space>
                ) : (
                  <Space>
                    <Radio value={"todo"}>Todo</Radio>
                    <Radio value={"working"}>Working</Radio>
                  </Space>
                )}
              </Radio.Group>
            </Col>
            <Col span={8}>
              <Button
                type="primary"
                onClick={() => {
                  handleSure(mode);
                }}
              >
                确定
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
