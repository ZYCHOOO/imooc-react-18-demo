// 位置信息类型
export type LocationType = {
  id: string,
  address: string,
}

// 轮播类型
export type BannersType = Array<{
  id: string;
  imgUrl: string;
}>

// 类名类型
export type CategoriesType = Array<{
  id: string,
  name: string,
  imgUrl: string,
}>

// 新品尝鲜类型
export type CardType = Array<{
  id: string,
  name: string,
  price: string,
  imgUrl: string,
}>

export type ResponseType = {
  message: string;
  data: {
    location: LocationType,
    banners: BannersType,
    categories: CategoriesType,
    freshes: CardType,
  }
}