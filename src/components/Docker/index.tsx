/*
 * @Date: 2024-10-31 10:07:07
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-31 12:49:39
 * @FilePath: /react-learn/huanlegou/src/components/Docker/index.tsx
 */

import './style.scss';
import { useNavigate } from 'react-router-dom';

const dockerItems = [
  {
    name: 'home',
    url: '/home',
    icon: '&#xe6f9;',
    text: '首页',
  }, {
    name: 'category',
    url: '/category',
    icon: '&#xe603;',
    text: '分类',
  }, {
    name: 'cart',
    url: '/cart',
    icon: '&#xe826;',
    text: '购物车',
  }, {
    name: 'mine',
    url: '/mine',
    icon: '&#xe691;',
    text: '我的',
  }
]

const Docker = (props: {activeName: string}) => {
  const navigate = useNavigate();
  const { activeName } = props;
  
  return (
    <div className="docker">
      {
        dockerItems.map((item) => (
          <div
            key={item.name}
            className={ activeName === item.name ? 'docker-item is-active flex-column flex-center' : 'docker-item flex-column flex-center'}
            onClick={() => navigate(item.url)}
          >
            <span className="iconfont" dangerouslySetInnerHTML={{ __html: item.icon}} />
            <span className='docker-item-title'>{item.text}</span>
          </div>
        ))
      }
    </div>
  )
}

export default Docker;