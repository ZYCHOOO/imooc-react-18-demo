/*
 * @Date: 2024-09-26 16:46:26
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-26 17:06:07
 * @FilePath: /react-learn/huanlegou/src/utils/message.tsx
 */
import ReactDOM from 'react-dom/client';

const modalStyle = {
  "position": "absolute" as const,
  "left": "50%",
  "top": "50%",
  "display": "table",
  "width": "2rem",
  "height": "1rem",
  "background": "rgba(0, 0, 0, .7)",
  "borderRadius": ".08rem",
  "transform": "translate(-50%, -50%)",
};

const modalTextStyle = {
  "padding": ".2rem",
  "display": "table-cell",
  "verticalAlign": "middle",
  "textAlign": "center" as const,
  "fontSize": ".16rem",
  "color": "#FFF",
};

const element = document.createElement('div');
const root = ReactDOM.createRoot(element);

export const message = (message: string, duration = 1500) => {
  root.render(
    <div style={modalStyle}>
      <div style={modalTextStyle}>{ message }</div>
    </div>
  )
  if (!element.parentNode) {
    document.body.appendChild(element);
    setTimeout(() => {
      document.body.removeChild(element);
    }, duration)
  }
}