/** @jsxImportSource @emotion/react */
import { useState } from "react";
import TopSection from "./event-process/top-section";
import BottomSection from "./event-process/bottom-section";
import { FormValues } from "./event-process/types";
import { useRegisterTabPage } from "shared/hooks";

interface Props {
  type?: string;
}
export default function EventProcess({ type }: Props) {
  useRegisterTabPage("事物处理", "/service-hall/event-process", type, () => {});
  const [eventState, setEventState] = useState<FormValues[]>([]);
  return (
    <div
      css={{
        padding: 10,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <TopSection eventState={eventState} setEventState={setEventState} />
      <BottomSection eventState={eventState} setEventState={setEventState} />
    </div>
  );
}
