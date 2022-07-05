/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useLocation } from "react-router-dom";
import Home from "pages/home";
import ServiceHall from "pages/service-hall";
import EventProcess from "pages/event-process";

export default function ContentSection() {
  const paramsInfo = useLocation();

  return (
    <div>
      {paramsInfo.pathname === "/home" ? (
        <Home />
      ) : paramsInfo.pathname === "/service-hall" ? (
        <ServiceHall />
      ) : paramsInfo.pathname === "/service-hall/event-process" ? (
        <EventProcess />
      ) : null}
    </div>
  );
}
