import { Outlet, useLocation } from "react-router-dom";
import List from "./comps/list";

function Template() {
  const path = useLocation();
  return <>{path.pathname === "/editor/template" ? <List /> : <Outlet />}</>;
}

export default Template;
