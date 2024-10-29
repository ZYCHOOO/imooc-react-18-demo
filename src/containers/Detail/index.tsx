/*
 * @Date: 2024-10-26 13:01:38
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-29 12:20:37
 * @FilePath: /react-learn/huanlegou/src/containers/Detail/index.tsx
 */

import './style.scss';
import useRequest from '../../hooks/useRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { ResponseType } from './types';

const requestData = {
  url: '/api/product/detail',
  method: 'GET',
  params: { id: '' }
}

function Detail () {
  const navigate = useNavigate();
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
        <div className="btn">加入购物车</div>
      </div>
    </div>
  )
}

export default Detail;