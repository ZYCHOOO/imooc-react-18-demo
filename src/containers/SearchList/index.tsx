/*
 * @Date: 2024-10-24 12:22:37
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-11-09 11:33:03
 * @FilePath: /react-learn/huanlegou/src/containers/SearchList/index.tsx
 */

import './style.scss';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import { ResponseType } from './types';

function SearchList () {
  const searchHistory = localStorage.getItem('search-history');
  const searchHistoryList: string[] = searchHistory ? JSON.parse(searchHistory) : [];

  const params = useParams<{keyword: string;shopId: string}>();
  const [keyword, setKeyword] = useState(params.keyword || '');
  const [currentTab, setCurrentTab] = useState('default');

  const [requestData, setRequestData] = useState({
    url: '/api/search/list',
    method: 'GET',
    params: {
      shopId: '',
      keyword: '',
      type: 'default',
    }
  });

  const { data } = useRequest<ResponseType>(requestData);
  const listData = data?.data || [];

  // 处理历史搜索缓存
  const handleSearchHistory = (key: string) => {
    if (key === 'Enter') {
      const historyIndex = searchHistoryList.findIndex((item) => item === keyword);
      let newHistoryList: string[] = [...searchHistoryList];
      if (historyIndex > -1) {
        newHistoryList.splice(historyIndex, 1);
      }
      newHistoryList.unshift(keyword);
      if (newHistoryList.length > 10) {
        newHistoryList.length = 10;
      }
      localStorage.setItem('search-history', JSON.stringify(newHistoryList));

      // 更新接口请求数据
      const newRequestData = {...requestData};
      newRequestData.params.keyword = keyword;
      setRequestData(newRequestData);
    }
  }

  // tab点击处理
  const handleTabClick = (tabValue: string) => {
    setCurrentTab(tabValue);
    const newRequestData = {...requestData};
    newRequestData.params.type = tabValue;
    setRequestData(newRequestData);
  }

  const handleClearSearch = () => {
    setKeyword('');

    // 更新接口请求数据
    const newRequestData = {...requestData};
    newRequestData.params.keyword = '';
    setRequestData(newRequestData);
  }

  return (
    <div className="page search-list-page">
      <div className="search-list-page-header flex-row flex-align-center">
        <Link to={`/search/${params.shopId}`}>
          <div className="iconfont back-icon">&#xe600;</div>
        </Link>

        <div className="search flex-row flex-align-center">
          <div className="iconfont search-icon">&#xe610;</div>
          <input
            value={keyword}
            className="search-input"
            placeholder="请输入商品名称"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => handleSearchHistory(e.key)}
          />
          {
            keyword ? (
              <div
                className="iconfont clear-icon"
                onClick={handleClearSearch}
              >
                &#xe62b;
              </div>
            ) : null
          }
        </div>
      </div>

      <div className="search-list-page-tabs flex-row flex-align-center">
        <div
          className={ currentTab === 'default' ? 'tab-item is-active' : 'tab-item'}
          onClick={() => handleTabClick('default')}
        >
          默认
        </div>
        <div
          className={ currentTab === 'sales' ? 'tab-item is-active' : 'tab-item'}
          onClick={() => handleTabClick('sales')}
        >
          销量
        </div>
        <div
          className={ currentTab === 'price' ? 'tab-item is-active' : 'tab-item'}
          onClick={() => handleTabClick('price')}
        >
          价格
        </div>
      </div>

      <div className="search-list-page-content">
        {
          listData.map((item) => (
            <Link key={item.id} to={`/detail/${item.id}`}>
              <div className="list-item flex-row flex-align-center">
                  <img src={item.imgUrl} alt="" />
                  <div className="list-item-info">
                    <div className='list-item-name'>{item.title}</div>
                    <div className='list-item-price'>
                      <span className="yen">&yen;</span>
                      <span className="price">{item.price}</span>
                    </div>
                    <div className='list-item-sales'>已售{item.sales}</div>
                  </div>
              </div>
            </Link>
          ))
        }

        <div className="bottom">
          —— 我是有底线的 ——
        </div>
      </div>
    </div>
  )
}

export default SearchList;