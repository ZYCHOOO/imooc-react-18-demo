// 位置信息类型
export type locationType = {
  id: string,
  address: string,
}

// 轮播类型
export type bannersType = Array<{
  id: string;
  imgUrl: string;
}>

// 类名类型
export type categoriesType = Array<{
  id: string,
  name: string,
  imgUrl: string,
}>

// 新品尝鲜类型
export type cardType = Array<{
  id: string,
  name: string,
  price: string,
  imgUrl: string,
}>

export type RequestType = {
  message: string;
  data: {
    location: locationType,
    banners: bannersType,
    categories: categoriesType,
    freshes: cardType,
  }
}