/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-04-07 14:52:54
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-04-16 16:04:03
 */
import { getAxios, postAxios } from "@/utils/request";
export const getActivityList = (params?: any) => {
  return getAxios(`/console-api/activity/list`, { params });
};
