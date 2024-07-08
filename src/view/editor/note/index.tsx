import { Outlet, useLocation } from "react-router-dom";
import List from "./comps/list";

function Note() {
  const path = useLocation();
  return <>{path.pathname === "/editor/note" ? <List /> : <Outlet />}</>;
}

export default Note;
