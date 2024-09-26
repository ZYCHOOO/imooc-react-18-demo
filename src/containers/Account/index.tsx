/*
 * @Date: 2024-09-25 22:27:34
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-26 10:29:48
 * @FilePath: /react-learn/huanlegou/src/containers/Account/index.tsx
 */
import { useEffect } from 'react';
import './style.scss';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

function Account () {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loginClassName = pathname === '/account/login' ? 'is-active' : '';
  const registerClassName = pathname === '/account/register' ? 'is-active' : '';

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home')
    }
  }, [navigate]);

  return (
    <div className="page account-page">
      <div className="toggle-tabs">
        <Link to="/account/login" className={loginClassName}>登录</Link>
        <Link to="/account/register" className={registerClassName}>注册</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Account;