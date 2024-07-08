import { Outlet, useLocation } from "react-router-dom";
import List from "./comps/list";

function Collect() {
  const path = useLocation();
  return <>{path.pathname === "/manager/collect" ? <List /> : <Outlet />}</>;
}

export default Collect;
