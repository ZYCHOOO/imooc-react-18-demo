export type ResponseType = {
  message: string,
  data: Array<{
    id: string;
    title: string;
    imgUrl: string;
    price: number;
    sales: number;
  }>
}