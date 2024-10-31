/*
 * @Date: 2024-10-31 10:07:07
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-31 10:22:48
 * @FilePath: /react-learn/huanlegou/src/components/Docker/index.tsx
 */

import './style.scss';
import { useNavigate } from 'react-router-dom';

const Docker = () => {
  const navigate = useNavigate();

  return (
    <div className="docker">
      <div
        className="docker-item"
        onClick={() => navigate('/home')}
      >
        <span className="iconfont">&#xe6f9;</span>
        <span className='docker-item-title'>首页</span>
      </div>
      <div
        className="docker-item"
        onClick={() => navigate('/category')}
      >
        <span className="iconfont">&#xe603;</span>
        <span className='docker-item-title'>分类</span>
      </div>
      <div
        className="docker-item"
        onClick={() => navigate('/home')}
      >
        <span className="iconfont">&#xe826;</span>
        <span className='docker-item-title'>购物车</span>
      </div>
      <div
        className="docker-item"
        onClick={() => navigate('/home')}
      >
        <span className="iconfont">&#xe691; </span>
        <span className='docker-item-title'>我的</span>
      </div>
    </div>
  )
}

export default Docker;