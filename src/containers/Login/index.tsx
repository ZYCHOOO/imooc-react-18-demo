import './style.scss';
import useRequest from '../../utils/useRequest';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

type RequestType = {
  name: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  // 通过泛型传递给 useRequest 方法
  const { error, request } = useRequest<RequestType>('/a.json', 'GET', {});
  
  const handleRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  function handleLogin() {
    request().then((res) => {
      console.log('get res data', res);
    }).catch((error) => {
      // alert(error);
      setShowModal(true);
    })
  }

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1500);
  
      return(() => {
        clearTimeout(timer);
      })
    };
  }, [showModal]);
  
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

      { showModal ? <Modal >{ error }</Modal> : null }
    </div>
  )
}

export default Login;