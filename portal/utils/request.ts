/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-04-01 13:33:38
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-15 16:53:56
 */
"use client"
import axios, { AxiosRequestConfig } from "axios";
import { message } from 'antd';
let baseURL: string = process.env.NEXT_PUBLIC_API as string;
// 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response?.data?.code === 135401) {
      localStorage.removeItem("token");
      window.location.replace('/');
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  (config) => {
    config.headers["token"] = localStorage.getItem("token") || "";
    config.headers["Content-Type"] = "application/json";
    // config.baseURL = baseURL;
    config.timeout = 10000;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios的get请求
export function getAxios(url: string, params?: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        ...params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err, "1");
        reject(err);
      });
  });
}

// axios的post请求
export function postAxios(url: string, data: any) {
  // 修改参数类型
  return new Promise((resolve, reject) => {
    axios({
      url, // 修改为url
      method: "post",
      ...data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default axios;
