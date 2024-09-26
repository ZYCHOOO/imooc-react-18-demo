/*
 * @Date: 2024-09-24 10:59:33
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-26 17:28:00
 * @FilePath: /react-learn/huanlegou/src/hooks/useRequest.tsx
 */
import { useCallback, useRef, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultOptions = { url: '/', method: 'GET', data: {}, params: {} };

function useRequest<T>(options: AxiosRequestConfig = defaultOptions) {
  const [data, setData] = useState<T | null>(null!);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  }

  const request = useCallback((requestOptions?: AxiosRequestConfig) => {
    // 清空上次请求状态
    setData(null);
    setError('')
    setLoaded(false);

    const token = localStorage.getItem('token');
    const headers = token ? { token } : {};

    // 发送请求
    return axios.request<T>({
      headers,
      url: requestOptions?.url || options.url,
      method: requestOptions?.method || options.method,
      signal: controllerRef.current.signal,
      data: requestOptions?.data || options.data,
      params: requestOptions?.params || options.params,
    }).then((res) => {
      setData(res.data);
      return res.data;
    }).catch((error: any) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/account/login');
      }
      setError(error.message || 'unknown request error');
      throw new Error(error);

    }).finally(() => {
      setLoaded(true);
    })
  }, [navigate, options]);
  return {data, error, loaded, request, cancel};
}

export default useRequest;