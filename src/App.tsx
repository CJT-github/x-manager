import { memo } from "react";
import { useRoutes } from "react-router-dom";
import { useLoadRouter } from "./hook/routers";

const App = memo(() => {
  const routes = useLoadRouter();
  return <>{useRoutes(routes)}</>;
});

export default App;
