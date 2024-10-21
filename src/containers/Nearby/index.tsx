/*
* @Date: 2024-10-21 13:12:25
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-21 16:59:40
 * @FilePath: /react-learn/huanlegou/src/containers/Nearby/index.tsx
*/

import './style.scss';
import { Link, Outlet, useLocation } from "react-router-dom";

function Nearby () {
  const { pathname } = useLocation();
  const locationClassName = pathname === '/nearby/bylocation' ? 'is-active' : '';
  const storeClassName = pathname === '/nearby/bystore' ? 'is-active' : '';

  return (
    <div className="page nearby-page">
      <div className="nearby-page-header">切换门店</div>
      <div className="toggle-tabs">
        <Link to="/nearby/bylocation" className={locationClassName}>按位置选择</Link>
        <Link to="/nearby/bystore" className={storeClassName}>按门店选择</Link>
      </div>

      <div className="search">
        <div className="search-icon iconfont">&#xe610;</div>
        <input className="search-input" placeholder='请输入地址' />
      </div>

      <Outlet />
    </div>
  )
}

export default Nearby;