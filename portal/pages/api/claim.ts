/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-04-22 09:53:56
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-13 18:42:39
 */
import { getAxios, postAxios } from "@/utils/request";
export const submitClaim = (data?: any) => {
  return postAxios(`/console-api/account/submit-claim`, { data });
};
export const submitClaimApprove = (data?: any) => {
  return postAxios(`/console-api/account/submit-claim-approve`, { data });
};
export const claimConfig = (data?: any) => {
  return postAxios(`/console-api/conf/common/claim-config`, { data });
};
export const getChaim = (data?: any) => {
  return postAxios(`off_chain/v1/checker/claim`, { data });
};