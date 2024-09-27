/*
 * @Date: 2024-09-26 10:16:51
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-27 13:41:40
 * @FilePath: /react-learn/huanlegou/src/containers/Home/index.tsx
 */
import './style.scss';
import 'swiper/css';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { message } from '../../utils/message';
import useRequest from '../../hooks/useRequest';
import { RequestType } from './types';

const locationHistory = localStorage.getItem('location');
const location = locationHistory ? JSON.parse(locationHistory) : null;

// 默认请求参数
const defaultRequestData = {
  url: '/api/home',
  method: 'POST',
  data: {
    latitude: location ? location.latitude : 37,
    longitude: location ? location.longitude : -122,
  }
}

function Home() {
  const [index, setIndex] = useState(1);
  const [requestData, setRequestData] = useState(defaultRequestData);
  const { data } = useRequest<RequestType>(requestData);

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
      }, { timeout: 3000 });
    }
  }, []);

  return (
    <div className="home-page">
      <div className="home-page-header">
        {/* 当前地址 */}
        <div className="location">
          <span className="iconfont">&#xe790;</span>
          <span>{ data?.data.location.address }</span>
        </div>

        {/* 搜索框 */}
        <div className='search'>
          <span className="iconfont">&#xe610;</span>
          <span>请输入你需要搜索的内容</span>
        </div>

        {/* 轮播图 */}
        <div className='swiper-area'>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(e: any) => setIndex(e.activeIndex + 1)}
          >
            {
              (data?.data.banners || []).map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <div className="swiper-item">
                      <img src={item.url} alt="" />
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>

          {
            data?.data.banners.length ?
            (
              <div className="pagination">
                <span>{index}/{data?.data.banners.length || 0}</span>
              </div>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default Home;