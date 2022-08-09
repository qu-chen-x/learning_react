/** @jsxImportSource @emotion/react */
import * as React from "react";
import { RichEditor } from "shared/components";

export default function AdventureMap() {
  return (
    <div
      css={{
        padding: "150px 0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div css={{ width: 1000 }}>
        <RichEditor value={[]} onChange={() => {}} />
      </div>
    </div>
  );
}
