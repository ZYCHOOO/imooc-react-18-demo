/*
 * @Date: 2024-10-29 12:56:49
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-29 16:58:21
 * @FilePath: /react-learn/huanlegou/src/containers/Category/index.tsx
 */

import { useState } from 'react';
import './style.scss';
import { useNavigate } from "react-router-dom";

function Category () {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  return (
    <div className="page category-page">
      <div className='category-page-header'>
        <div
          className="iconfont back-icon"
          onClick={() => navigate(-1)}
        >
          &#xe600;
        </div>
        <span>分类</span>
      </div>

      <div className="search">
        <div className="iconfont search-icon">&#xe610;</div>
        <input
          value={keyword}
          className="search-input"
          placeholder="请输入商品名称"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="category-page-content">
        <div className="category">
          <div className="category-item is-active">精选商品</div>
          <div className="category-item">单品优惠</div>
          <div className="category-item">新鲜水果</div>
          <div className="category-item">时令蔬菜</div>
          <div className="category-item">肉蛋家禽</div>
          <div className="category-item">水产海鲜</div>
          <div className="category-item">牛奶面包</div>
          <div className="category-item">冷冻冷藏</div>
        </div>
        <div className="category-content">
          <div className="tabs">
            <div className="tab-item is-active">全部</div>
            <div className="tab-item">果蔬</div>
            <div className="tab-item">肉蛋家禽</div>
            <div className="tab-item">海鲜</div>
            <div className="tab-item">全部</div>
            <div className="tab-item">果蔬</div>
            <div className="tab-item">肉蛋家禽</div>
            <div className="tab-item">海鲜</div>
          </div>
          <div className="list">
            <div className="list-total">精选商品（50）</div>
            <div className="list-item">
              <img src="http://statics.dell-lee.com/shopping/category-list-1.png" alt="" />
              <div className="list-item-content">
                <div className="list-item-title">华都食品 鸡翅中 1000g/ ...</div>
                <div className="list-item-sales">月售156</div>
                <div className="list-item-price">
                  <span className="yen">&yen;</span>
                  <span>59.9</span>
                </div>
                <div className="list-item-btn">购买</div>
              </div>
            </div>
            <div className="list-item">
              <img src="http://statics.dell-lee.com/shopping/category-list-1.png" alt="" />
              <div className="list-item-content">
                <div className="list-item-title">华都食品 鸡翅中 1000g/ ...</div>
                <div className="list-item-sales">月售156</div>
                <div className="list-item-price">
                  <span className="yen">&yen;</span>
                  <span>59.9</span>
                </div>
                <div className="list-item-btn">购买</div>
              </div>
            </div>
            <div className="list-item">
              <img src="http://statics.dell-lee.com/shopping/category-list-1.png" alt="" />
              <div className="list-item-content">
                <div className="list-item-title">华都食品 鸡翅中 1000g/ ...</div>
                <div className="list-item-sales">月售156</div>
                <div className="list-item-price">
                  <span className="yen">&yen;</span>
                  <span>59.9</span>
                </div>
                <div className="list-item-btn">购买</div>
              </div>
            </div>
            <div className="list-item">
              <img src="http://statics.dell-lee.com/shopping/category-list-1.png" alt="" />
              <div className="list-item-content">
                <div className="list-item-title">华都食品 鸡翅中 1000g/ ...</div>
                <div className="list-item-sales">月售156</div>
                <div className="list-item-price">
                  <span className="yen">&yen;</span>
                  <span>59.9</span>
                </div>
                <div className="list-item-btn">购买</div>
              </div>
            </div>
            <div className="list-item">
              <img src="http://statics.dell-lee.com/shopping/category-list-1.png" alt="" />
              <div className="list-item-content">
                <div className="list-item-title">华都食品 鸡翅中 1000g/ ...</div>
                <div className="list-item-sales">月售156</div>
                <div className="list-item-price">
                  <span className="yen">&yen;</span>
                  <span>59.9</span>
                </div>
                <div className="list-item-btn">购买</div>
              </div>
            </div>
            <div className="list-item">
              <img src="http://statics.dell-lee.com/shopping/category-list-1.png" alt="" />
              <div className="list-item-content">
                <div className="list-item-title">华都食品 鸡翅中 1000g/ ...</div>
                <div className="list-item-sales">月售156</div>
                <div className="list-item-price">
                  <span className="yen">&yen;</span>
                  <span>59.9</span>
                </div>
                <div className="list-item-btn">购买</div>
              </div>
            </div>
            <div className="list-item">
              <img src="http://statics.dell-lee.com/shopping/category-list-1.png" alt="" />
              <div className="list-item-content">
                <div className="list-item-title">华都食品 鸡翅中 1000g/ ...</div>
                <div className="list-item-sales">月售156</div>
                <div className="list-item-price">
                  <span className="yen">&yen;</span>
                  <span>59.9</span>
                </div>
                <div className="list-item-btn">购买</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部 */}
      <div className="docker">
        <div className="docker-item">
          <span className="iconfont">&#xe6f9;</span>
          <span className='docker-item-title'>首页</span>
        </div>
        <div className="docker-item is-active">
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

export default Category;