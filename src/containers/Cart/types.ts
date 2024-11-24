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