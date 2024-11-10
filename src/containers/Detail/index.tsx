/*
 * @Date: 2024-10-26 13:01:38
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-11-10 22:01:21
 * @FilePath: /react-learn/huanlegou/src/containers/Detail/index.tsx
 */

import './style.scss';
import useRequest from '../../hooks/useRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { ResponseType } from './types';
import Popover from '../../components/Popover';
import { useState } from 'react';

const requestData = {
  url: '/api/product/detail',
  method: 'GET',
  params: { id: '' }
}

function Detail () {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const params = useParams<{id: string}>();
  if (params.id) {
    requestData.params.id = params.id;
  }
  const { data } = useRequest<ResponseType>(requestData);
  const detail = data?.data;

  return (
    <div className="page detail-page">
      <div className='detail-page-header'>
        <div
          className="iconfont back-icon"
          onClick={() => navigate(-1)}
        >
          &#xe600;
        </div>
        <span>商品详情</span>
      </div>

      <img src={detail?.imgUrl} alt="" />

      <div className="main">
        <div className="main-price">
          <span className="yen">&yen;</span>
          <span>{detail?.price}</span>
        </div>
        <div className="main-sales">已售 {detail?.sales}</div>
        <div className='main-content'>
          <div className="main-content-title">{detail?.title}</div>
          <div className="main-content-desc">{detail?.subTitle}</div>
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
            <span className="spec-content-item">{detail?.origin}</span>
            <span className="spec-content-item">{detail?.specification}</span>
          </div>
        </div>
      </div>

      <div className="detail">
        <div className="detail-title">商品详情</div>
        <div className="detail-content">{detail?.detail}</div>
      </div>

      <div className="docker">
        <div className="cart">
          <span className="iconfont cart-icon">&#xe601;</span>
          <span className="cart-title">购物车</span>
        </div>
        <div
          className="btn"
          onClick={() =>setShowCart(true)}
        >
          加入购物车
        </div>
      </div>

      <Popover
        show={showCart}
        outsideClickCallback={() => setShowCart(false)}
      >
        <div className="cart">
          <div className="cart-content">
            <img src={detail?.imgUrl} alt="" className="cart-content-img" />
            <div className="cart-content-info">
              <div className="cart-content-title">{detail?.title}</div>
              <div className="cart-content-price">
                <span className="yen">&yen;</span>
                <span>{detail?.price}</span>
              </div>
            </div>
          </div>
          <div className="cart-count">
            <div className="cart-count-title">购买数量</div>
            <div className="cart-count-counter">
              <span className="cart-count-button">-</span>
              <span className="cart-count-text">1</span>
              <span className="cart-count-button">+</span>
            </div>
          </div>
          <div className="cart-btn">加入购物车</div>
        </div>
      </Popover>
    </div>
  )
}

export default Detail;