/*
 * @Date: 2024-09-27 13:18:55
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-27 13:26:26
 * @FilePath: /react-learn/huanlegou/src/containers/Account/ types.ts
 */

// 登录返回结果类型
export type LoginRequestType = {
  message: string;
  code: number;
  data: {
    token: string;
  }
}

// 注册返回结果类型
export type RegisterRequestType = {
  message: string;
  code: number;
  data: boolean;
}