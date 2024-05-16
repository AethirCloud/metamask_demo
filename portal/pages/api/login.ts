/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-04-02 11:31:46
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-08 11:02:21
 */
import { postAxios, getAxios } from "@/utils/request";

export const getOwnerVerify = (data?: any) => {
  return postAxios(`/console-api/owner/verify`, { data });
};
export const getOwnerLogin = (data?: any) => {
  return postAxios(`/console-api/owner/login`, { data });
};
export const getDownloadConf = (data?: any) => {
  return getAxios(`/console-api/client/download-conf`, { data });
};
export const getSessionStatus = (data?: any) => {
  return getAxios(`/console-api/kyc/querySessionStatus `, { data });
};
export const initSession = (params?: any) => {
  return getAxios(`/console-api/kyc/initSession`, { params });
};
export const getBlocking = (data?: any) => {
  return postAxios(`/console-api/ip/blocking`, { data });
};

