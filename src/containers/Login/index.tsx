import './style.css';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const handleRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <div className="page login-page">
      <div className="toggle-tabs">
        <div className="toggle-tab is-active">登录</div>
        <div className="toggle-tab" onClick={handleRegister}>注册</div>
      </div>

      <div className="form">
        <div className="form-item">
          <div className="form-item-title">手机号</div>
          <div className="form-item-content">
            <input placeholder="请输入手机号码" />
          </div>
        </div>
        <div className="form-item">
        <div className="form-item-title">密码</div>
        <div className="form-item-content">
          <input type="password" placeholder="请输入密码" />
        </div>
        </div>
      </div>

      <div className="login-btn">登录</div>
      <div className="notice-text">
        *登录即表示您赞同使用条款及隐私政策
      </div>
    </div>
  )
}

export default Login;