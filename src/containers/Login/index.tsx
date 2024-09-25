/*
 * @Date: 2024-09-24 18:15:26
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-25 14:07:05
 * @FilePath: /react-learn/huanlegou/src/containers/Login/index.tsx
 */
import './style.scss';
import useRequest from '../../utils/useRequest';
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal, { ModalRefType } from '../../components/Modal';

type RequestType = {
  name: string;
}

const Login = () => {
  const navigate = useNavigate();

  const modalRef = useRef<ModalRefType>(null);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // 通过泛型传递给 useRequest 方法
  const { request } = useRequest<RequestType>();
  
  const handleRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  function handleLogin() {
    if (!phone) {
      modalRef.current?.showModal('手机号不能为空！');
      return;
    }
    if (!password) {
      modalRef.current?.showModal('密码不能为空！');
      return;
    }
    request({
      url: '/a.json',
      method: 'GET',
      params: { phone, password },
    }).then((res) => {
      console.log('get res data', res);
    }).catch((error) => {
      modalRef.current?.showModal(error?.message);
    })
  }
  
  return (
    <div className="page login-page">
      <div className="toggle-tabs">
        <div className="toggle-tab is-active">登录</div>
        <div className="toggle-tab" onClick={handleRegister}>注册</div>
      </div>

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
        className="login-btn"
        onClick={handleLogin}
      >
        登录
      </div>
      <div className="notice-text">
        *登录即表示您赞同使用条款及隐私政策
      </div>

      {/* { showModal ? <Modal >{ error }</Modal> : null } */}
      <Modal ref={modalRef} />
    </div>
  )
}

export default Login;