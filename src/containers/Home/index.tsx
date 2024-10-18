/*
 * @Date: 2024-09-26 10:16:51
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-18 19:16:22
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

      <div className="category">
        <div className="category-item">
          <img src="http://statics.dell-lee.com/shopping/category-1.png" alt="新鲜蔬菜" />
          <p>新鲜蔬菜</p>
        </div>
        <div className="category-item">
          <img src="http://statics.dell-lee.com/shopping/category-2.png" alt="鲜肉蛋禽" />
          <p>鲜肉蛋禽</p>
        </div>
        <div className="category-item">
          <img src="http://statics.dell-lee.com/shopping/category-3.png" alt="时令水果" />
          <p>时令水果</p>
        </div>
        <div className="category-item">
          <img src="http://statics.dell-lee.com/shopping/category-4.png" alt="乳品烘焙" />
          <p>乳品烘焙</p>
        </div>
        <div className="category-item">
          <img src="http://statics.dell-lee.com/shopping/category-5.png" alt="粮油速食" />
          <p>粮油速食</p>
        </div>
        <div className="category-item">
          <img src="http://statics.dell-lee.com/shopping/category-6.png" alt="休闲零食" />
          <p>休闲零食</p>
        </div>
        <div className="category-item">
          <img src="http://statics.dell-lee.com/shopping/category-7.png" alt="家居百货" />
          <p>家居百货</p>
        </div>
        <div className="category-item">
          <img src="http://statics.dell-lee.com/shopping/category-8.png" alt="个护美妆" />
          <p>个护美妆</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="title">
            <img src="http://statics.dell-lee.com/shopping/hot.png" alt="热点" />
            <span>新品尝鲜</span>
          </div>
          <div className="more">
            <span>更多</span>
            <div className="iconfont">&#xe614;</div>
          </div>
          
        </div>
        <div className="card-content">
          <div className="card-content-item">
            <img src="" alt="" />
            <span className="card-content-item-name">金锣 国产猪肉 去皮猪五花肉块 …</span>
            <div className="card-content-item-operate">
              <span className="yen">&yen;</span>
              <span className="price">66.9</span>
              <div className="iconfont">&#xe611;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;