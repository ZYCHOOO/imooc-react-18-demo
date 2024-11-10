/*
 * @Date: 2024-11-09 11:38:56
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-11-09 12:31:58
 * @FilePath: /react-learn/huanlegou/src/components/Popover/index.tsx
 */
import './style.scss';
import { ReactNode } from 'react';

const Popover = (props: {
  show: boolean,
  outsideClickCallback: () => void,
  children: ReactNode
}) => {
  const { show, outsideClickCallback, children } = props;

  return show ? (
    <div className="popover">
      <div
        className="popover-mask"
        onClick={outsideClickCallback}
      />
      <div className="popover-content">{children}</div>
    </div>
  ) : null;
}

export default Popover;