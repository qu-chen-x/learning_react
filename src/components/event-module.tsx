/** @jsxImportSource @emotion/react */
import { Card, Checkbox, Col, Radio, Row, Space } from "antd";
import { useState } from "react";

interface Props {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}
export default function EventModule({ className, children, title }: Props) {
  const [radioValue, setRadioValue] = useState("");
  const handleCheckbox = () => {};

  return (
    <Card className={className} title={title}>
      <Row gutter={[8, 16]}>
        <Col span={24}> {children}</Col>
        <Col span={24}>
          <Row gutter={8}>
            <Col span={8}>
              <Checkbox onChange={handleCheckbox}>全选</Checkbox>
            </Col>
            <Col span={16}>
              <Radio.Group
                onChange={(e) => {
                  setRadioValue(e.target.value);
                }}
                value={radioValue}
              >
                <Space>
                  <Radio value={"working"}>Working</Radio>
                  <Radio value={"done"}>Done</Radio>
                </Space>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
