/*
 * @Date: 2024-11-09 11:38:56
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-11-09 11:48:20
 * @FilePath: /react-learn/huanlegou/src/components/Popover/index.tsx
 */
import './style.scss';

const Popover = (props: {
  show: boolean,
  outsideClickCallback: () => void
}) => {
  const { show, outsideClickCallback } = props;

  return show ? (
    <div className="popover">
      <div
        className="popover-mask"
        onClick={outsideClickCallback}
      />
      <div className="popover-content">abc</div>
    </div>
  ) : null;
}

export default Popover;