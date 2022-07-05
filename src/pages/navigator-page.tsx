/** @jsxImportSource @emotion/react */
import * as React from "react";

import ContentSection from "./navigator-page/content-section";
import NavigatorSection from "./navigator-page/navigator-section";
import "../App.css";

export default function NavigatorPage() {
  return (
    <div
      className="App"
      css={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "10px 20px",
        background: "#f5f5f5",
      }}
    >
      <div css={{ width: "15%", height: "100%", background: "#fff" }}>
        <NavigatorSection />
      </div>
      <div css={{ width: "85%", height: "100%", background: "#fff" }}>
        <ContentSection />
      </div>
    </div>
  );
}
