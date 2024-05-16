/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-04-02 14:08:34
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-04-12 11:09:20
 */
import { getAxios, postAxios } from "@/utils/request";

export const getLastPeriodReward = (data?: any) => {
  return postAxios(`/console-api/statis/last-period-reward`, { data });
};
export const getTotalClaim = (data?: any) => {
  return postAxios(`/console-api/statis/total-claim`, { data });
};
export const getTotalReward = (data?: any) => {
  return postAxios(`/console-api/statis/total-reward`, { data });
};
export const getTotalWithdraw = (data?: any) => {
  return postAxios(`/console-api/statis/total-withdraw`, { data });
};
export const getLicensesDelegation = (data?: any) => {
  return postAxios(`/console-api/statis/delegation`, { data });
};
export const getRunningStatus = (data?: any) => {
  return postAxios(`/console-api/statis/running-status`, { data });
};
export const getTop10TotalReward = (data?: any) => {
  return postAxios(`/console-api/statis/license/total-reward/top10`, { data });
};
export const getTop10WorkingTime = (data?: any) => {
  return postAxios(`/console-api/statis/license/total-proof/top10`, { data });
};
export const getMyAccount = (data?: any) => {
  return postAxios(`/console-api/account/my`, { data });
};
export const getClientList = (params?: any) => {
  return getAxios(`/console-api/daily-reward/client/list`, { params });
};
