/*
 * @Date: 2024-10-21 13:19:05
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-21 18:51:51
 * @FilePath: /react-learn/huanlegou/src/containers/Nearby/byStore.tsx
 */

const ByStore = () => {
  return (
    <div className="store">
      <div className="store-title">附近门店</div>
      <ul className="store-list">
        <li className="store-list-item">
          <div className="store-list-item-left">
            <div className="store-list-item-title">优果购</div>
            <div className="store-list-item-desc">联系电话：17194091107</div>
            <div className="store-list-item-address">北京市昌平区南邵镇四合园59号</div>
          </div>
          <div className="store-list-item-right">
            <div className="iconfont">&#xe790;</div>
            <span className="distance">799m</span>
          </div>
        </li>
      </ul>   
    </div>
  )
}

export default ByStore;