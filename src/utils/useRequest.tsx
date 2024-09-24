/*
 * @Date: 2024-09-24 10:59:33
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-24 15:28:06
 * @FilePath: /react-learn/huanlegou/src/utils/useRequest.tsx
 */
import { useRef, useState } from 'react';
import axios, { AxiosRequestConfig, Method } from 'axios';

function useRequest<T>(url: string, method: Method, payload: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null!);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  }

  const request = () => {
    // 清空上次请求状态
    setData(null);
    setError('')
    setLoaded(false);

    // 发送请求
    return axios.request<T>({
      url,
      method,
      signal: controllerRef.current.signal,
      data: payload
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