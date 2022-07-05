/** @jsxImportSource @emotion/react */
import * as React from "react";
import myRoutes from "routes";
import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(myRoutes);

  return (
    <React.Suspense fallback={<span>出错了！</span>}>{element}</React.Suspense>
  );
}

export default App;
