/*
 * @Date: 2024-09-26 10:16:51
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-26 14:45:17
 * @FilePath: /react-learn/huanlegou/src/containers/Home/index.tsx
 */
import './style.scss';
import 'swiper/css';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

function Home() {
  const [index, setIndex] = useState(1);

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