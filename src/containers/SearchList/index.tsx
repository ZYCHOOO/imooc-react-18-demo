/*
 * @Date: 2024-10-24 12:22:37
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-24 15:13:58
 * @FilePath: /react-learn/huanlegou/src/containers/SearchList/index.tsx
 */

import './style.scss';
import { Link } from 'react-router-dom';

function SearchList () {
  return (
    <div className="page search-list-page">
      <div className="search-list-page-header">
        <Link to="/home">
          <div className="iconfont back-icon">&#xe600;</div>
        </Link>

        <div className="search">
          <div className="iconfont search-icon">&#xe610;</div>
          <input
            className="search-input"
            placeholder="请输入商品名称"
          />
        </div>
      </div>

      <div className="search-list-page-tabs">
        <div className="tab-item">默认</div>
        <div className="tab-item">销量</div>
        <div className="tab-item">价格</div>
      </div>

      <div className="search-list-page-content">
        <div className="list-item">
          <img src="http://statics.dell-lee.com/shopping/fresh-4.png" alt="" />
          <div className="list-item-info">
            <div className='list-item-name'>普罗旺斯西红柿 陕西泾阳生吃沙瓤西红柿农家自种时令生鲜 水果  ...</div>
            <div className='list-item-price'>
              <span className="yen">&yen;</span>
              <span className="price">49.8</span>
            </div>
            <div className='list-item-sold'>已售388</div>
          </div>
        </div>
        <div className="list-item">
          <img src="http://statics.dell-lee.com/shopping/fresh-4.png" alt="" />
          <div className="list-item-info">
            <div className='list-item-name'>山东西红柿自然熟番茄新鲜水果蔬菜健康轻食 严选5斤装</div>
            <div className='list-item-price'>
              <span className="yen">&yen;</span>
              <span className="price">27.9</span>
            </div>
            <div className='list-item-sold'>已售982</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchList;