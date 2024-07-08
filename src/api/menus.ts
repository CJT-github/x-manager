import { METHOD, request } from "@/utils/request.ts";

//获取菜单
export const getMenusList = (params?: Object) => {
  return request("/user/menus-list", METHOD.GET, params);
};

//更改菜单
export const updateMenus = (params?: Object) => {
  return request("/user/update-menus", METHOD.POST, params);
};

//新增菜单
export const saveMenus = (params?: Object) => {
  return request("/user/save-menus", METHOD.POST, params);
};
