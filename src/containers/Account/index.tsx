/*
 * @Date: 2024-09-25 22:27:34
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-25 22:45:44
 * @FilePath: /react-learn/huanlegou/src/containers/Account/index.tsx
 */
import './style.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Account () {
  const { pathname } = useLocation();
  const loginIsActive = pathname === '/account/login';
  console.log('loginIsActive::', loginIsActive);

  return (
    <div className="page account-page">
      <div className="toggle-tabs">
        <Link to="/account/login" className={loginIsActive ? 'is-active' : ''}>登录</Link>
        <Link to="/account/register" className={loginIsActive ? '' : 'is-active'}>注册</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Account;