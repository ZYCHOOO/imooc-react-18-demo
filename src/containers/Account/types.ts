/*
 * @Date: 2024-09-27 13:18:55
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-22 11:42:39
 * @FilePath: /react-learn/huanlegou/src/containers/Account/types.ts
 */

// 登录返回结果类型
export type LoginResponseType = {
  message: string;
  code: number;
  data: {
    token: string;
  }
}

// 注册返回结果类型
export type RegisterResponseType = {
  message: string;
  code: number;
  data: boolean;
}