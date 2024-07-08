import { routerComponents } from "@/router";
import React from "react";
import { RouteObject } from "react-router-dom";

//处理菜单结构数据
export const handleMenus = (menus: Array<any>) => {
  let levelData: Array<any> = [];
  let roots: Array<any> = [];
  let node;
  let levelMap = new Map();
  menus.forEach((obj, i) => {
    let {
      level,
      icon,
      blank,
      description,
      pid,
      menuKey,
      routerPath,
      name,
      path,
    } = obj;
    let item = {
      level,
      icon: icon,
      description,
      pid,
      key: routerPath,
      label: name,
      menuKey,
      routerPath,
      blank,
      path,
      children: [],
    };
    let _index = path.split("/");
    // 初始化 map
    levelMap.set(_index[_index.length - 1], i);
    // 初始化 children
    levelData.push(item);
  });
  levelData.forEach((obj) => {
    node = obj;
    if (node.pid !== 0) {
      levelData[levelMap.get(String(node.pid))].children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
};

//处理路由数据
export const mapMenusToRouter = (menus: Array<any>) => {
  let result = menus.map((item) => {
    let { routerPath, menuKey, children } = item;
    if (children.length) {
      children = mapMenusToRouter(children);
      return {
        id: menuKey,
        children,
        path: routerPath,
        element: routerComponents[menuKey],
      };
    }
    return {
      id: menuKey,
      path: routerPath,
      element: routerComponents[menuKey],
    };
  });
  return result;
};

// 合并路由
export function handleMergeRoutes(
  defaultRoutes: RouteObject[],
  routes: RouteObject[]
) {
  // 拷贝原路由(坚持React数据不变)
  const newDefaultRoutes = deepCopyRoute<RouteObject[]>(defaultRoutes);
  // 拿到main路由
  const routeItem = newDefaultRoutes.find((item) => item.id === "root") ?? {};
  // 添加新路由
  routeItem.children = routes;
  // 返回新路由
  return newDefaultRoutes;
}

// 拷贝路由对象
function deepCopyRoute<T>(raw: T): T {
  let copyData: any = Array.isArray(raw) ? [] : {};

  for (const key in raw) {
    const value: any = raw[key];
    // 如果是普通类型或者react元素则不深拷贝
    const condition = typeof value !== "object" || React.isValidElement(value);
    if (condition) {
      copyData[key] = value;
    } else if (typeof value === "object") {
      copyData[key] = deepCopyRoute(value);
    }
  }
  return copyData;
}

//处理中国地区数据
export const handleCity = () => {};
