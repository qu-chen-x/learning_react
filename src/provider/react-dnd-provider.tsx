import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Props {
  children: React.ReactNode;
}
export default function ReactDndProvider({ children }: Props) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
