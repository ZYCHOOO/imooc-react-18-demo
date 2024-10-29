export type CategoryTagResponseType = {
  message: string;
  data: {
    category: Array<{
      id: string;
      name: string;
    }>;
    tag: string[];
  }
}

export type CategoryProductListType = {
  message: string;
  data: Array<{
    id: string;
    imgUrl: string;
    name: string;
    price: number;
    sales: number;
  }>
}
