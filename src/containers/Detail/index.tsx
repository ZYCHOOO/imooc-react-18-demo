/*
 * @Date: 2024-10-26 13:01:38
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-28 13:25:55
 * @FilePath: /react-learn/huanlegou/src/containers/Detail/index.tsx
 */

import './style.scss';
import { Link } from 'react-router-dom';

function Detail () {
  return (
    <div className="page detail-page">
      <div className='detail-page-header'>
        <Link to="/home">
          <div className="iconfont back-icon">&#xe600;</div>
        </Link>
        <span>商品详情</span>
      </div>

      <img src="http://statics.dell-lee.com/shopping/detail.png" alt="" />

      <div className="main">
        <div className="main-price">
          <span className="yen">&yen;</span>
          <span>39.9</span>
        </div>
        <div className="main-sales">已售 546</div>
        <div className='main-content'>
          <div className="main-content-title">山东海阳普罗旺斯西红柿自然熟沙瓢番茄新鲜水果蔬菜健康轻食 严选彩箱5斤装</div>
          <div className="main-content-desc">鱼鲜敲，清脆,爽口，附着的白毛为这个季节飘扬在田间的柳絮杨絮</div>
        </div>
      </div>

      <div className="spec">
        <div className="spec-title">规格信息</div>
        <div className="spec-content">
          <div className="spec-content-left">
            <span className="spec-content-item">产地</span>
            <span className="spec-content-item">规格</span>
          </div>
          <div className="spec-content-right">
            <span className="spec-content-item">以实际购买商品批次为准</span>
            <span className="spec-content-item">2kg</span>
          </div>
        </div>
      </div>

      <div className="detail">
        <div className="detail-title">商品详情</div>
        <div className="detail-content">普罗旺斯西红柿不同于别的西红柿品种，它的表面有沟有棱，不像高粉西红柿那样表面光滑饱满，看起来更像秋天的软柿子或者甜椒，正因为有沟有棱，所以它里面显得很空，草莓心，尤其是第一二层最为明显，第三四层就会好很多，第五层基本不会存在这种情况。</div>
      </div>

      <div className="docker">
        <div className="cart">
          <span className="iconfont cart-icon">&#xe601;</span>
          <span className="cart-title">购物车</span>
        </div>
        <div className="btn">加入购物车</div>
      </div>
    </div>
  )
}

export default Detail;