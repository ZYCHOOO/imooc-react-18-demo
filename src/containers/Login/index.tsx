import './style.scss';
import useRequest from '../../utils/useRequest';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type RequestType = {
  name: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // 通过泛型传递给 useRequest 方法
  const {data, error, loaded, request} = useRequest<RequestType>('/a.json', 'GET', {});
  
  const handleRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  function handleLogin() {
    request();
  }

  useEffect(() => {
    if (data) {
      console.log('登录成功！');
    }
    if (error) {
      console.log(error);
    }
  }, [data, error])

  if (loaded) {
    if (data) {
      console.log('登录成功！');
    } else {
      alert(error);
    }
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
    </div>
  )
}

export default Login;