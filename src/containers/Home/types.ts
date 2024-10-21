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
    }>,
    categories: Array<{
      id: string,
      url: string,
      name: string,
    }>,
    freshes: Array<{
      id: string,
      name: string,
      url: string,
      price: string,
    }>,
  }
}