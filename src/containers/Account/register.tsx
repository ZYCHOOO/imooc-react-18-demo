/*
 * @Date: 2024-09-23 10:18:35
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-25 22:39:41
 * @FilePath: /react-learn/huanlegou/src/containers/Account/register.tsx
 */

import { useState, useRef } from 'react';
import useRequest from '../../utils/useRequest';
import Modal, { ModalRefType } from '../../components/Modal';

type RequestType = {
  message: string
  code: number
  data: boolean
}

const Register = () => {
  const modalRef = useRef<ModalRefType>(null);
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { request } = useRequest<RequestType>();

  function handleRegister() {
    if (!userName) {
      modalRef.current?.showModal('用户名不能为空！');
      return;
    }
    if (!phone) {
      modalRef.current?.showModal('手机号不能为空！');
      return;
    }
    if (!password) {
      modalRef.current?.showModal('密码不能为空！');
      return;
    }
    if (password.length < 6) {
      modalRef.current?.showModal('密码长度不能小于6！');
      return;
    }
    if (password !== confirmPassword) {
      modalRef.current?.showModal('两次密码输入不一致！');
      return;
    }
    request({
      url: '/api/register',
      method: 'POST',
      data: { userName, phone, password }
    }).then((res) => {
      console.log('get res data', res);
    }).catch((error) => {
      modalRef.current?.showModal(error?.message);
    })
  }

  return (
    <div className="page register-page">

      <div className="form">
        <div className="form-item">
          <div className="form-item-title">用户名</div>
          <input
            value={userName}
            className="form-item-content"
            placeholder="请输入用户名"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <div className="form-item-title">手机号</div>
          <input
            value={phone}
            className="form-item-content"
            placeholder="请输入手机号码"
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
        <div className="form-item">
          <div className="form-item-title">确认密码</div>
          <input
            value={confirmPassword}
            type="password"
            placeholder="请输入确认密码"
            className="form-item-content"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div
        className="submit-btn"
        onClick={handleRegister}
      >
        注册
      </div>

      <Modal ref={modalRef} />
    </div>
  )
}

export default Register;