import { useEffect, useState } from "react";
import { routers as defaultRoutes } from "@/router";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { handleMergeRoutes, mapMenusToRouter } from "@/utils";

export function useLoadRouter() {
  const [routes, setRoutes] = useState(defaultRoutes);

  const { menus } = useSelector(
    (state: RootState) => ({
      menus: state.basicMsg.menus,
    }),
    shallowEqual
  );

  //监听菜单数据的改变
  useEffect(() => {
    //把菜单转成路由
    const newRoutes = mapMenusToRouter(menus);
    //合并路由
    const router = handleMergeRoutes(routes, newRoutes);
    //最新的路由
    setRoutes(router);
  }, [menus]);

  return routes;
}
