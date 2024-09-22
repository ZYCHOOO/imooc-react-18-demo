/*
 * @Date: 2023-05-28 23:07:15
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-20 17:31:05
 * @FilePath: /react-learn/huanlegou/src/App.tsx
 */

import 'normalize.css';
import './styles/base.css';
import './styles/border.css';

import { HashRouter, Routes, Route } from 'react-router-dom';

import Guide from './containers/Guide';
import Login from './containers/Login';
import Register from './containers/Register';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Guide />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </HashRouter>
  );
}

export default App;