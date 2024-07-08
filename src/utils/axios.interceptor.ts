import { refreshToken } from "@/api/login";
import { message } from "antd";
import cache from "./cache";
import { request, setAuthorization } from "./request";

const codeMessage: { [key: number]: string } = {
  100: "登陆状态失效，正在重新登陆",
  400: "请求错误",
  401: "权限不足",
  403: "禁止请求",
  404: "请求失败，资源未找到",
  405: "禁止请求",
  406: "不接受该请求",
  408: "请求超时",
  409: "请求冲突",
  410: "请求失败，资源未找到",
  413: "请求失败，资源过大",
  500: "服务器内部错误",
  502: "错误网关",
  503: "服务不可用",
  504: "网关超时",
  505: "HTTP 版本不受支持",
};

//续签请求
async function refreshTokenFn() {
  const res = await refreshToken({
    refreshToken: cache.getCache("refreshToken"),
  });
  let token = res?.data?.access_token || "";
  setAuthorization({ token });
  return res;
}

export const interceptors = {
  resFulfilled: (config: any) => {
    //设置请求头
    const { xsrfHeaderName } = config;
    xsrfHeaderName &&
      (config.headers[xsrfHeaderName] = cache.getCache(xsrfHeaderName));
    return config;
  },
  resRejected: (error: any) => {
    return;
  },
  repFulfilled: (response: { code: number; data: any; message: string }) => {
    return response.data;
  },
  repRejected: async (error: any) => {
    console.log(error);
    const { response, code } = error;

    if (
      response?.data?.statusCode === 401 &&
      !response.config.url.includes("/user/refresh")
    ) {
      const res = await refreshTokenFn();
      if (res.code === 200 || res.code === 201) {
        const { url, method, data, baseURL } = response.config;
        return request(url, method, data, { baseURL });
      }
      return;
    }
    if (code == "ERR_CANCELED") return; // 取消请求 判定为响应失败 但不需要 message 提示信息
    if (code === "ERR_NETWORK") {
      message.error("网络连接已断开，请检查网络");
      return;
    }
    if (code === "ECONNABORTED") {
      message.error("请求超时，请检查网络");
      return;
    }
    if (response?.data?.message) {
      message.info(response?.data?.message);
      return;
    }
    message.error(codeMessage[response?.status]);
    return;
  },
};
