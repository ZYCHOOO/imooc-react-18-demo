type CartItemType = {
  productId: string;
  imgUrl: string;
  weight: string;
  title: string;
  price: number;
  count: number;
  isChecked?: boolean;
}

export type ShopListItemType = {
  shopId: string;
  shopName: string;
  isChecked?: boolean;
  cartList: Array<CartItemType>;
}

export type CartListResponseType = {
  message: string;
  data: Array<ShopListItemType>;
}