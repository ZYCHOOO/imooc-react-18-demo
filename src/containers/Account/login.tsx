/*
 * @Date: 2024-09-24 18:15:26
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-29 18:26:12
 * @FilePath: /react-learn/huanlegou/src/containers/Account/login.tsx
 */

import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import { message } from '../../utils/message';
import { LoginResponseType } from './types';

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // 通过泛型传递给 useRequest 方法
  const { request } = useRequest<LoginResponseType>({ manual: true });

  function handleLogin() {
    if (!phone) {
      message('手机号不能为空！');
      return;
    }
    if (!password) {
      message('密码不能为空！');
      return;
    }
    request({
      url: '/api/login',
      method: 'POST',
      data: { phone, password },
    }).then((res) => {
      const { token } = res.data;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      }
    }).catch((error) => {
      message(error?.message);
    })
  }
  
  return (
    <div className="page login-page">

      <div className="form">
        <div className="form-item">
          <div className="form-item-title">手机号</div>
          <input
            value={phone}
            placeholder="请输入手机号码"
            className="form-item-content"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-item">
        <div className="form-item-title">密码</div>
        <input
          value={password}
          type="password"
          placeholder="请输入密码"
          className="form-item-content"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
      </div>

      <div
        className="submit-btn"
        onClick={handleLogin}
      >
        登录
      </div>
      <div className="notice-text">
        *登录即表示您赞同使用条款及隐私政策
      </div>
    </div>
  )
}

export default Login;