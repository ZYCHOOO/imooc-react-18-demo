/*
* @Date: 2024-10-21 13:12:25
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-23 12:19:12
 * @FilePath: /react-learn/huanlegou/src/containers/Nearby/index.tsx
*/

import './style.scss';
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

function Nearby () {
  const { pathname } = useLocation();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setKeyword('');
  }, [pathname])

  const locationClassName = pathname === '/nearby/bylocation' ? 'is-active' : '';
  const storeClassName = pathname === '/nearby/bystore' ? 'is-active' : '';

  return (
    <div className="page nearby-page">
      <div className="nearby-page-header flex-row flex-align-center">
        <Link to="/home">
          <div className="iconfont">&#xe600;</div>
        </Link>
        <span>切换门店</span>
      </div>
      <div className="toggle-tabs">
        <Link to="/nearby/bylocation" className={locationClassName}>按位置选择</Link>
        <Link to="/nearby/bystore" className={storeClassName}>按门店选择</Link>
      </div>

      <div className="search">
        <div className="search-icon iconfont">&#xe610;</div>
        <input value={keyword} className="search-input" placeholder='请输入地址' onChange={(e) => { setKeyword(e.target.value)}} />
      </div>

      <Outlet context={keyword} />
    </div>
  )
}

export default Nearby;