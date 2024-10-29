/*
 * @Date: 2024-10-26 13:06:23
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-29 12:14:22
 * @FilePath: /react-learn/huanlegou/src/containers/Detail/types.ts
 */
export type ResponseType = {
  success: string;
  data: {
    id: string;
    imgUrl: string;
    title: string;
    subTitle: string;
    price: number;
    sales: number;
    origin: string;
    specification: string;
    detail: string;
  }
}