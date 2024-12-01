/*
 * @Date: 2024-11-24 11:38:06
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-12-01 17:31:04
 * @FilePath: /react-learn/huanlegou/src/containers/Cart/index.tsx
 */

import './style.scss';
import { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { ShopListItemType, CartListResponseType } from './types';
import Docker from '../../components/Docker';

function Cart () {
  const [cartList, setCartList] = useState<ShopListItemType[]>([]);

  const { request } = useRequest<CartListResponseType>({ manual: true });

  useEffect(() => {
    request({
      url: '/api/cartList',
      method: 'get'
    }).then((res) => {
      const cartList = res.data
        ? res.data.map((item) => ({
          ...item,
          isChecked: false,
        })) : [];
      setCartList(cartList);
    })
  }, [request])

  return (
    <div className="page cart-page">
      <div className="cart-page-header flex-row flex-center">
        购物车
      </div>

      <div className="cart-page-content flex-column">
        {
          (cartList || []).map((item) => {
            return (
              <div
                key={item.shopId}
                className="cart-page-item"
              >
                <div className="shop-title flex-row flex-align-center">
                  <span className="radio"></span>
                  <span className="iconfont">&#xe676;</span>
                  <span className="shop-title-text">{item.shopName}</span>
                </div>
                {(item.cartList || []).map((cartItem) => {
                  return (
                    <div
                      key={cartItem.productId}
                      className="product-item flex-row flex-align-center"
                    >
                      <span className="radio"></span>
                      <img src={cartItem.imgUrl} alt="" />
                      <div className="product-item-info flex-column">
                        <span className="product-name">{cartItem.title}</span>
                        <span className="product-weight">{cartItem.weight}</span>
                        <div className="product-price">
                          <span className="yen">&yen;</span>
                          <span>{cartItem.price}</span>
                        </div>
                        <div className="product-operate flex-row">
                          <span className="product-operate-item flex-row flex-center">-</span>
                          <input value={cartItem.count} className="product-operate-input"></input>
                          <span className="product-operate-item flex-row flex-center">+</span>
                        </div>
                      </div>
                  </div>
                  )
                })}
              </div>
            )
          })
        }
      </div>

      <div className="cart-page-bottom flex-row flex-align-center">
        <span className="radio"></span>
        <span className="select-all">全选</span>
        <div className="total flex-row">
          <span className="total-text">合计：</span>
          <div className="total-price">
            <span className="yen">&yen;</span>
            <span>158</span>
          </div>
        </div>
        <div className="settle-btn flex-row flex-center">结算（2）</div>
      </div>
      <Docker activeName="cart" />
    </div>
  )
}

export default Cart;