import './style.css';
import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Guide = () => {
  // 处理动画逻辑
  const ref = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    ref.current.style.opacity = '1';
  }, []);
  
  // 处理路由跳转逻辑
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div ref={ref} className="page guide-page">
      <img
        src={require('../../images/guide-icon.png')}
        className="guide-icon"
        alt=""
      />
      <p className="guide-title">欢乐购</p>

      <img
        src={require('../../images/slogan-icon.png')}
        className='slogan-icon'
        alt=""
      />

      <div
        className="iconfont"
        onClick={handleClick}
      >
        &#xe60c;
      </div>
    </div>
  )
}

export default Guide;