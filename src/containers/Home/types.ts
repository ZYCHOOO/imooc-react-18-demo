export type RequestType = {
  message: string;
  data: {
    location: {
      id: string;
      address: string;
    };
    banners: Array<{
      id: string;
      url: string;
    }>
  }
}