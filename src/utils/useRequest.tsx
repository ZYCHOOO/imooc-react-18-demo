/*
 * @Date: 2024-09-24 10:59:33
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-25 11:09:12
 * @FilePath: /react-learn/huanlegou/src/utils/useRequest.tsx
 */
import { useRef, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

function useRequest<T>(options: AxiosRequestConfig = {
  url: '/', method: 'GET', data: {}, params: {}
}) {
  const [data, setData] = useState<T | null>(null!);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  }

  const request = (requestOptions?: AxiosRequestConfig) => {
    // 清空上次请求状态
    setData(null);
    setError('')
    setLoaded(false);

    // 发送请求
    return axios.request<T>({
      url: requestOptions?.url || options.url,
      method: requestOptions?.method || options.method,
      signal: controllerRef.current.signal,
      data: requestOptions?.data || options.data,
      params: requestOptions?.params || options.params,
    }).then((res) => {
      setData(res.data);
      return res.data;
    }).catch((error: any) => {
      setError(error.message || 'unknown request error');
      throw new Error(error);
    }).finally(() => {
      setLoaded(true);
    })
  }
  return {data, error, loaded, request, cancel};
}

export default useRequest;