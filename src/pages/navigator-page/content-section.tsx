/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useLocation } from "react-router-dom";
import Home from "pages/home";
import ServiceHall from "pages/service-hall";
import EventProcess from "pages/event-process";
import AdventureMap from "pages/adventure-map";
import AreaCensus from "pages/area-census";

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
      ) : paramsInfo.pathname === "/service-hall/adventure-map" ? (
        <AdventureMap />
      ) : paramsInfo.pathname === "/service-hall/area-census" ? (
        <AreaCensus />
      ) : null}
    </div>
  );
}
