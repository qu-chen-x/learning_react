/** @jsxImportSource @emotion/react */
import { useState } from "react";
import TopSection from "./event-process/top-section";
import BottomSection from "./event-process/bottom-section";
import { FormValues } from "./event-process/types";
export default function EventProcess() {
  const [eventState, setEventState] = useState<FormValues[]>([]);
  return (
    <div css={{ padding: 10 }}>
      <TopSection eventState={eventState} setEventState={setEventState} />
      <BottomSection eventState={eventState} setEventState={setEventState} />
    </div>
  );
}
