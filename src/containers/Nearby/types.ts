/*
 * @Date: 2024-10-22 11:48:50
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-29 18:29:31
 * @FilePath: /react-learn/huanlegou/src/containers/Nearby/types.ts
 */
export type ResponseType = {
  message: string;
  data: Array<{
    id: string;
    name: string;
    phone: string;
    address: string;
    distance: string;
    longitude: string;
    latitude: string;
  }>
}