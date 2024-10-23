
/*
* @Date: 2024-10-23 12:05:11
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-23 22:36:19
 * @FilePath: /react-learn/huanlegou/src/containers/Search/index.tsx
*/
import './style.scss';
import { useState } from 'react';
import { Link } from "react-router-dom";
import useRequest from '../../hooks/useRequest';
import { ResponseType } from './types';

const defaultRequestData = {
  url: '/api/search/hot',
  method: 'POST',
}

function Search() {
  const searchHistory = localStorage.getItem('search-history');
  const searchHistoryList: string[] = searchHistory ? JSON.parse(searchHistory) : [];
  const [keyword, setKeyword] = useState('');
  const [historyList, setHistoryList] = useState(searchHistoryList);

  const { data } = useRequest<ResponseType>(defaultRequestData);
  const hotSearchList = data?.data || [];

  const handleSearch = (key: string) => {
    if (key === 'Enter') {
      const newHistoryList = [keyword, ...historyList];
      if (newHistoryList.length > 10) {
        newHistoryList.length = 10;
      }
      setHistoryList(newHistoryList);
      setKeyword('');
      localStorage.setItem('search-history', JSON.stringify(newHistoryList))
    }
  }

  const clearHistoryClick = () => {
    setHistoryList([]);
    localStorage.removeItem('search-history');
  }

  return (
    <div className="page search-page">
      <div className="search-page-header">
        <Link to="/home">
          <div className="iconfont back-icon">&#xe600;</div>
        </Link>

        <div className="search">
          <div className="iconfont search-icon">&#xe610;</div>
          <input
            value={keyword}
            className="search-input"
            placeholder="请输入商品名称"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => handleSearch(e.key)}
          />
        </div>
      </div>

      {/* 历史搜索 */}
      {
        historyList.length ? (
          <>
            <div className="search-page-title">
              <span>历史搜索</span>
              <div
                className="iconfont close-icon"
                onClick={clearHistoryClick}
              >&#xe62b;</div>
            </div>
            <ul className="history-list">
              {
                (historyList || []).map((item, index) => {
                  return (
                    <li key={index} className="history-list-item">{item}</li>
                  )
                })
              }
            </ul>
          </>
        ) : null
      }

      {/* 热门搜索 */}
      {
        hotSearchList.length ? (
          <>
            <div className="search-page-title" style={{marginTop: '0.18rem'}}>热门搜索</div>
            <ul className="hot-list">
              {
                hotSearchList.map((item) => (
                  <li
                    key={item.id}
                    className="hot-list-item"
                  >
                    {item.name}
                  </li>
                ))
              }
            </ul>
          </>
        ) : null
      }

    </div>
  )
}

export default Search;