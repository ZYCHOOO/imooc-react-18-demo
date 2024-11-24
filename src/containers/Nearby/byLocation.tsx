import { useOutletContext } from "react-router-dom";

const ByLocation = () => {
  const keyword = useOutletContext();

  console.log('test', keyword);
  return (
    <div className="location">
      <div className="location-title">当前地址</div>
      <div className="location-current flex">
        <div className="location-current-title">风景丽苑</div>
        <div className="location-current-operate flex-row flex-align-center">
          <span className="iconfont">&#xe6a2;</span>
          <span>重新定位</span>
        </div>
      </div>
      <div className="location-title">附近地址</div>
      <ul className="location-list">
        <li className="location-list-item flex-row flex-column">
          <div className="location-list-item-title">四合园</div>
          <div className="location-list-item-address">北京市昌平区南邵镇四合园59号</div>
        </li>
      </ul>
    </div>
  )
}

export default ByLocation;