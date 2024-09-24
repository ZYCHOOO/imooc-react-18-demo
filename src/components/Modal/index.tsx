/*
 * @Date: 2024-09-24 15:18:59
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-09-24 15:44:48
 * @FilePath: /react-learn/huanlegou/src/components/Modal/index.tsx
 */
import './style.scss';

function Modal (props: { children: string }) {
  const { children } = props;
  return (
    <div className="modal">
      <div className="modal-text">{ children }</div>
    </div>
  )
}

export default Modal;