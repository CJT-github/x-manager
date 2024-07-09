import { METHOD, request } from "@/utils/request.ts";

//获取笔记列表
export const template = (params?: Object) => {
  return request("/template", METHOD.POST, params, { timeout: 0 });
};
