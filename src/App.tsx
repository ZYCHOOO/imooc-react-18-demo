/*
 * @Date: 2023-05-28 23:07:15
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-21 13:24:21
 * @FilePath: /react-learn/huanlegou/src/App.tsx
 */

import 'normalize.css';
import './styles/base.css';
import './styles/border.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';

import Guide from './containers/Guide';
import Account from './containers/Account';
import Login from './containers/Account/login';
import Register from './containers/Account/register';
import Home from './containers/Home';
import Nearby from './containers/Nearby';
import ByLocation from './containers/Nearby/byLocation';
import ByStore from './containers/Nearby/byStore';

const router = createHashRouter([
  {
    path: '/',
    element: <Guide />
  }, {
    path: '/account',
    element: <Account />,
    children: [{
      path: '/account/login',
      element: <Login />,
    }, {
      path: '/account/register',
      element: <Register />
    }]
  }, {
    path: '/home',
    element: <Home />
  }, {
    path: '/nearby',
    element: <Nearby />,
    children: [{
      path: '/nearby/bylocation',
      element: <ByLocation />,
    }, {
      path: '/nearby/bystore',
      element: <ByStore />,
    }]
  }
])

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;