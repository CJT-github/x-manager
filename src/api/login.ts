import { METHOD, request } from "@/utils/request.ts";

//获取验证码
export const getCache = (params?: Object) => {
  return request("/user/register-captcha", METHOD.GET, params);
};

//登录
export const login = (params?: Object) => {
  return request("/user/login", METHOD.POST, params);
};

//续签
export const refreshToken = (params?: Object) => {
  return request("/user/refresh", METHOD.GET, params);
};

//获取菜单
export const getMenus = (params?: Object) => {
  return request("/user/menus", METHOD.GET, params);
};

//退出登录
export const logout = (params?: Object) => {
  return request("/user/logout", METHOD.GET, params);
};
