/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-04-01 14:33:25
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-04-07 13:26:19
 */
import { getAxios, postAxios } from "@/utils/request";

export const getLicenseList = (params?: any) => {
  return getAxios(`/console-api/license/list`, { params });
};
export const applyDelegate = (data?: any) => {
  return postAxios(`/console-api/license/apply-delegate`, { data });
};
export const undelegate = (data?: any) => {
  return postAxios(`/console-api/license/undelegate`, { data });
};
export const submitApplyDelegate = (data?: any) => {
  return postAxios(`/console-api/license/submit-apply-delegate`, { data });
};
