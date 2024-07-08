//请求封装

import axios from "axios";
import cache from "./cache";
import { isEmpty } from "lodash";

interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

interface Auth {
  token: string;
  refreshToken?: string;
}
interface Interceptors {
  resFulfilled: Function;
  resRejected: Function;
  repFulfilled: Function;
  repRejected: Function;
}

axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.timeout = 5000;

// 跨域认证信息 header 名
const xsrfHeaderName = "Authorization";
axios.defaults.xsrfHeaderName = xsrfHeaderName;

// http method
const METHOD = {
  GET: "get",
  POST: "post",
};

/**
 * axios请求
 */
async function request(
  url: string,
  method: string,
  params?: any,
  config?: Object
): Promise<ApiResponse<any>> {
  switch (method) {
    case METHOD.GET:
      return axios.get(url, { params, ...config });
    case METHOD.POST:
      return axios.post(url, params, config);
    default:
      return axios.get(url, { params, ...config });
  }
}

/**
 * 设置认证信息
 */
function setAuthorization(auth: Auth) {
  if (auth.token) {
    cache.setCache(xsrfHeaderName, "Bearer " + auth.token);
  }
  if (auth.refreshToken) {
    cache.setCache("refreshToken", auth.refreshToken);
  }
}

/**
 * 移出认证信息
 */
function removeAuthorization() {
  cache.remove(xsrfHeaderName);
  cache.remove("refreshToken");
}

/**
 * 检查认证信息
 */
function checkAuthorization() {
  if (
    !isEmpty(cache.getCache(xsrfHeaderName)) &&
    !isEmpty(cache.getCache("userInfo"))
  ) {
    return true;
  }
  return false;
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 */
function loadInterceptors(interceptors: Interceptors) {
  let { resRejected, resFulfilled, repRejected, repFulfilled } = interceptors;
  // 加载请求拦截器
  if (!resFulfilled || typeof resFulfilled !== "function") {
    resFulfilled = (config: any) => config;
  }
  if (!resRejected || typeof resRejected !== "function") {
    resRejected = (error: any) => Promise.reject(error);
  }
  axios.interceptors.request.use(
    (config) => resFulfilled(config),
    (error) => resRejected(error)
  );

  // 加载响应拦截器
  if (!repFulfilled || typeof repFulfilled !== "function") {
    repFulfilled = (response: any) => response;
  }
  if (!repRejected || typeof repRejected !== "function") {
    repRejected = (error: any) => Promise.reject(error);
  }
  axios.interceptors.response.use(
    (response) => repFulfilled(response),
    (error) => repRejected(error)
  );
}

export {
  axios,
  METHOD,
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  loadInterceptors,
};
