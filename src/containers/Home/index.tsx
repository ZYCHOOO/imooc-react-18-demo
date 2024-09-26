/*
 * @Date: 2024-09-26 10:16:51
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-26 17:14:55
 * @FilePath: /react-learn/huanlegou/src/containers/Home/index.tsx
 */
import './style.scss';
import 'swiper/css';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { message } from '../../utils/message';

const locationHistory = localStorage.getItem('location');
const location = locationHistory ? JSON.parse(locationHistory) : null;

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
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
          <span>南丰汇</span>
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
            <SwiperSlide>
              <div className="swiper-item">
                <img src="http://statics.dell-lee.com/shopping/banner.png" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-item">
                <img src="http://statics.dell-lee.com/shopping/banner.png" alt="" />
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="pagination">
            <span>{index}/2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;