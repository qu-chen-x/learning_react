/** @jsxImportSource @emotion/react */
import * as React from "react";
import { EventModule, EventPiece } from "components";
import { Col, Row } from "antd";
import { FormValues } from "./types";
interface Props {
  eventState: FormValues | null;
  setEventState: React.Dispatch<React.SetStateAction<FormValues | null>>;
}
export default function BottomSection({ eventState, setEventState }: Props) {
  return (
    <div css={{}}>
      <Row gutter={8}>
        <Col span={8}>
          <EventModule title="Todo">
            <EventPiece pieceInfo={eventState} />
          </EventModule>
        </Col>
        <Col span={8}>
          <EventModule title="Working">
            <EventPiece pieceInfo={null} />
          </EventModule>
        </Col>
        <Col span={8}>
          <EventModule title="Done">
            <EventPiece pieceInfo={null} />
          </EventModule>
        </Col>
      </Row>
    </div>
  );
}
