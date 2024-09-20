/*
 * @Date: 2023-05-28 23:07:15
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-20 17:01:47
 * @FilePath: /react-learn/huanlegou/src/App.tsx
 */
import './styles/app.css';
import { useRef, useEffect } from 'react';

const App = () => {
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    ref.current.style.opacity = '1';
  }, []);

  return (
    <div ref={ref} className="halo-page">
      <img
        src={require('./images/halo-icon.png')}
        className="halo-icon"
        alt=""
      />
      <p className="halo-title">欢乐购</p>

      <img
        src={require('./images/slogan-icon.png')}
        className='slogan-icon'
        alt=""
      />

      <div className="iconfont">&#xe60c;</div>
    </div>
  )
}

export default App;