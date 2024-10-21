/*
 * @Date: 2024-09-26 10:16:51
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-21 12:20:21
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

      {/* 品类 */}
      <div className="category">
        {
          (data?.data.categories || []).map((item) => {
            return (
              <div key={item.id} className="category-item">
                <img src={item.url} alt={item.name} />
                <p>{ item.name }</p>
              </div>
            )
          })
        }
      </div>

      {/* 新品尝鲜 */}
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
          {
            (data?.data.freshes || []).map((item) => {
              return (
                <div key={item.id} className="card-content-item">
                  <img src={item.url} alt={item.name} />
                  <span className="card-content-item-name">{item.name}</span>
                  <div className="card-content-item-operate">
                    <span className="yen">&yen;</span>
                    <span className="price">{item.price}</span>
                    <div className="iconfont">&#xe611;</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* 限时折扣 */}

      {/* 猜你喜欢 */}

      {/* 底部 */}
      <div className="bottom">
        —— 我是有底线的 ——
      </div>

      {/* 底部 */}
      <div className="docker">
        <div className="docker-item">
          <span className="iconfont">&#xe6f9;</span>
          <span className='docker-item-title'>首页</span>
        </div>
        <div className="docker-item">
          <span className="iconfont">&#xe603;</span>
          <span className='docker-item-title'>分类</span>
        </div>
        <div className="docker-item">
          <span className="iconfont">&#xe826;</span>
          <span className='docker-item-title'>购物车</span>
        </div>
        <div className="docker-item">
          <span className="iconfont">&#xe691; </span>
          <span className='docker-item-title'>我的</span>
        </div>
      </div>
    </div>
  )
}

export default Home;