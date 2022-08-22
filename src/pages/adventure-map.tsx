/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Descendant } from "slate";
import { RichEditor } from "shared/components";
import { useRegisterTabPage } from "shared/hooks";

export default function AdventureMap() {
  useRegisterTabPage("探险地图", "/service-hall/adventure-map", () => {});
  const [editState, setEditState] = React.useState<Descendant[]>(
    RichEditor.initialValue
  );

  return (
    <div
      css={{
        padding: "150px 0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div css={{ width: 1000 }}>
        <RichEditor
          value={editState}
          onChange={(value) => {
            setEditState(value);
          }}
        />
      </div>
    </div>
  );
}
