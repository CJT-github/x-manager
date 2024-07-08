import { Outlet, useLocation } from "react-router-dom";
import MessageBasic from "./comps/messageBasic";

function Message() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/manager/message" ? <MessageBasic /> : <Outlet />}
    </>
  );
}

export default Message;
