import { getAxios, postAxios } from "@/utils/request";
export const accountWithdraw = (data?: any) => {
  return postAxios(`/console-api/account/withdraw`, { data });
};
export const withdrAwapprove = (data?: any) => {
  return postAxios(`/console-api/account/withdraw-approve`, { data });
};