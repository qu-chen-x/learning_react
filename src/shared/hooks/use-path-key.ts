import { useLocation } from "react-router-dom";

export default function usePathKey() {
  const location = useLocation();
  return location.pathname + location.search;
}
