import './style.scss'
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate])

  return (
    <div className="page register-page">
      <div className="toggle-tabs">
        <div className="toggle-tab" onClick={handleLogin}>登录</div>
        <div className="toggle-tab is-active">注册</div>
      </div>

      <div className="form">
        <div className="form-item">
          <div className="form-item-title">用户名</div>
          <input
            className="form-item-content"
            placeholder="请输入用户名"
          />
        </div>
        <div className="form-item">
          <div className="form-item-title">手机号</div>
          <input
            className="form-item-content"
            placeholder="请输入手机号码"
          />
        </div>
        <div className="form-item">
          <div className="form-item-title">密码</div>
          <input
            type="password"
            placeholder="请输入密码"
            className="form-item-content"
          />
        </div>
        <div className="form-item">
          <div className="form-item-title">确认密码</div>
          <input
            type="password"
            placeholder="请输入确认密码"
            className="form-item-content"
          />
        </div>
      </div>

      <div className="register-btn">注册</div>
    </div>
  )
}

export default Register;