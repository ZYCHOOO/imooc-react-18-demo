/*
 * @Date: 2024-10-26 13:06:23
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-11-23 11:20:31
 * @FilePath: /react-learn/huanlegou/src/containers/Detail/types.ts
 */
export type DetailResponseType = {
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

export type CartCountResponseType = {
  success: string;
  data: {
    count: number
  }
}