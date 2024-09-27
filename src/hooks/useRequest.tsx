/*
 * @Date: 2024-09-24 10:59:33
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-27 13:49:08
 * @FilePath: /react-learn/huanlegou/src/hooks/useRequest.tsx
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from '../utils/message';

const defaultOptions = { url: '/', method: 'GET', data: {}, params: {} };

function useRequest<T>(
  options: AxiosRequestConfig & { manual?: boolean } = defaultOptions
) {
  const [data, setData] = useState<T | null>(null!);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  }

  const request = useCallback((requestOptions: AxiosRequestConfig) => {
    // 清空上次请求状态
    setData(null);
    setError('')
    setLoaded(false);

    const token = localStorage.getItem('token');
    const headers = token ? { token } : {};

    // 发送请求
    return axios.request<T>({
      headers,
      url: requestOptions.url,
      method: requestOptions.method,
      signal: controllerRef.current.signal,
      data: requestOptions.data,
      params: requestOptions.params,
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
  }, [navigate]);

  useEffect(() => {
    if (!options.manual) {
      request(options).catch((error: any) => {
        message(error?.message);
      })
    }
  }, [request, options]);

  return {data, error, loaded, request, cancel};
}

export default useRequest;