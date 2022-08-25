/** @jsxImportSource @emotion/react */

import * as React from "react";
import { useDrag } from "react-dnd";

const style: React.CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};

export interface BoxProps {
  name: string;
}

interface DropResult {
  name: string;
}

interface Props {
  name: string;
  flag: boolean;
}

export default function Litter({ name, flag }: Props) {
  const [isShow, setShow] = React.useState<boolean>(!flag);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    item: { name, flag },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
        setShow(item.flag);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      ref={drag}
      style={{
        ...style,
        opacity,
        transform: isShow ? "none" : `translate(${"-250px"})`,
      }}
      data-testid={`box`}
    >
      {name}
    </div>
  );
}
