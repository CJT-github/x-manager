import { METHOD, request } from "@/utils/request.ts";

//开启爬虫
export const starSpider = (params?: Object) => {
  return request("/job/start-spider", METHOD.GET, params, {
    timeout: 60 * 30 * 1000,
  });
};

//获取boss直聘内容
export const spiderList = (params?: Object) => {
  return request("/job/spider-list", METHOD.GET, params);
};
