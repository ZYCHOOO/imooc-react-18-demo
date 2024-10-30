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

export type ProductType = {
  id: string;
  imgUrl: string;
  name: string;
  price: number;
  sales: number;
}

export type CategoryProductListType = {
  message: string;
  data: Array<ProductType>
}
