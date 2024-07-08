import { METHOD, request } from "@/utils/request.ts";

//获取minio直传url
export const presignedUrl = (params?: Object) => {
  return request("/minio/presignedUrl", METHOD.GET, params);
};
