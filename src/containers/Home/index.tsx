/*
 * @Date: 2024-09-26 10:16:51
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-31 12:48:49
 * @FilePath: /react-learn/huanlegou/src/containers/Home/index.tsx
 */
import './style.scss';
import { useState, useEffect } from 'react';
import { message } from '../../utils/message';
import useRequest from '../../hooks/useRequest';
import { ResponseType } from './types';
import Category from './components/Categoty';
import Card from './components/Card';
import Banner from './components/Banner';
import Docker from '../../components/Docker';

// 默认请求参数
const defaultRequestData = {
  url: '/api/home',
  method: 'POST',
  data: {
    latitude: 37,
    longitude: -122,
  }
}

function Home() {
  const locationHistory = localStorage.getItem('location');
  const location = locationHistory ? JSON.parse(locationHistory) : null;
  
  if (location) {
    defaultRequestData.data.longitude = location.longitude;
    defaultRequestData.data.latitude = location.latitude;
  }

  const [requestData, setRequestData] = useState(defaultRequestData);
  const { data } = useRequest<ResponseType>(requestData);

  // 获取经纬度
  useEffect(() => {
    if (navigator.geolocation && !location) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        localStorage.setItem('location', JSON.stringify({
          latitude,
          longitude,
        }))
        setRequestData({
          ...defaultRequestData,
          data: { latitude, longitude },
        })
      }, (error: any) => {
        message(error?.message);
      }, { timeout: 30000 });
    }
  }, [location]);

  return (
    <div className="home-page">
      {/* 头部轮播 */}
      <Banner location={data?.data.location} banners={data?.data.banners} />

      {/* 品类 */}
      <Category categories={data?.data.categories} />

      {/* 新品尝鲜 */}
      <Card title="新品尝鲜" list={data?.data.freshes} />

      {/* 限时折扣 */}

      {/* 猜你喜欢 */}

      {/* 底部 */}
      <div className="bottom">
        —— 我是有底线的 ——
      </div>

      <Docker activeName="home" />
    </div>
  )
}

export default Home;