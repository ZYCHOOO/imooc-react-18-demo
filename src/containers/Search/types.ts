/*
 * @Date: 2024-10-23 22:18:00
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-23 22:22:57
 * @FilePath: /react-learn/huanlegou/src/containers/Search/types.ts
 */
export type ResponseType = {
  message: string;
  data: Array<{
    id: string;
    name: string;
  }>
}