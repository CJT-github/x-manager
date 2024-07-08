import { METHOD, request } from "@/utils/request.ts";

//获取分类列表
export const getCategoryList = (params?: Object) => {
  return request("/category/getCategoryList", METHOD.GET, params);
};

//添加分类
export const createCategory = (params?: Object) => {
  return request("/category/createCategory", METHOD.POST, params);
};

//修改分类
export const updateCategory = (params?: Object) => {
  return request("/category/updateCategory", METHOD.POST, params);
};
