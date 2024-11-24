
/*
* @Date: 2024-10-23 12:05:11
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-11-18 09:50:33
 * @FilePath: /react-learn/huanlegou/src/containers/Search/index.tsx
*/
import './style.scss';
import { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import useRequest from '../../hooks/useRequest';
import { ResponseType } from './types';

const defaultRequestData = {
  url: '/api/search/hot',
  method: 'POST',
  params: { shopId: '' },
}

function Search() {
  const params = useParams<{shopId: string}>();
  const navigate = useNavigate();
  const searchHistory = localStorage.getItem('search-history');
  const searchHistoryList: string[] = searchHistory ? JSON.parse(searchHistory) : [];
  const [keyword, setKeyword] = useState('');
  const [historyList, setHistoryList] = useState(searchHistoryList);

  if (params.shopId) {
    defaultRequestData.params.shopId = params.shopId;
  }

  const { data } = useRequest<ResponseType>(defaultRequestData);
  const hotSearchList = data?.data || [];

  // 处理input输入框搜索
  const handleSearch = (key: string) => {
    if (key === 'Enter') {
      handleKeyword(keyword);
    }
  }

  // 搜索内容传值与缓存处理
  const handleKeyword = (keywordStr: string) => {
    const historyIndex = historyList.findIndex((item) => item === keywordStr);
    let newHistoryList: string[] = [...historyList];
    if (historyIndex > -1) {
      newHistoryList.splice(historyIndex, 1);
    }
    newHistoryList.unshift(keywordStr);
    if (newHistoryList.length > 10) {
      newHistoryList.length = 10;
    }
    setHistoryList(newHistoryList);
    setKeyword('');
    localStorage.setItem('search-history', JSON.stringify(newHistoryList));

    navigate(`/searchlist/${params.shopId}/${keywordStr}`);
  }

  // 清除历史搜索
  const clearHistoryClick = () => {
    setHistoryList([]);
    localStorage.removeItem('search-history');
  }

  return (
    <div className="page search-page">
      <div className="search-page-header flex-row flex-align-center">
        <Link to="/home">
          <div className="iconfont back-icon">&#xe600;</div>
        </Link>

        <div className="search flex-row flex-align-center">
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
            <div className="search-page-title flex-row flex-align-center">
              <span>历史搜索</span>
              <div
                className="iconfont close-icon"
                onClick={clearHistoryClick}
              >&#xe62b;</div>
            </div>
            <ul className="history-list flex-row flex-wrap">
              {
                (historyList || []).map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="history-list-item flex-row flex-align-center"
                      onClick={() => {handleKeyword(item)}}
                    >
                      {item}
                    </li>
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
            <ul className="hot-list flex-row flex-wrap">
              {
                hotSearchList.map((item) => (
                  <li
                    key={item.id}
                    className="hot-list-item flex-row flex-align-center"
                    onClick={() => {handleKeyword(item.name)}}
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