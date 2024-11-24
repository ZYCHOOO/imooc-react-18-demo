/*
 * @Date: 2024-10-21 13:19:05
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-11-24 17:50:24
 * @FilePath: /react-learn/huanlegou/src/containers/Nearby/byStore.tsx
 */
import { useNavigate, useOutletContext } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import { ResponseType } from "./types";

const locationHistory = localStorage.getItem('location');
const location = locationHistory ? JSON.parse(locationHistory) : null;

const defaultRequestData = {
  url: '/api/nearby/store',
  method: 'POST',
  data: {
    latitude: location ? location.latitude : 37,
    longitude: location ? location.longitude : -122,
  }
}

const ByStore = () => {
  const keyword:string = useOutletContext();
  const navigate = useNavigate();

  const { data } = useRequest<ResponseType>(defaultRequestData);

  const list = (data?.data || []).filter((item) => item.name.includes(keyword));

  const handleStoreClick = (longitude: string, latitude: string) => {
    localStorage.setItem('location', JSON.stringify({
      latitude,
      longitude,
    }));
    navigate('/home');
  }

  return (
    <div className="store">
      <div className="store-title">附近门店</div>
      <ul className="store-list">
        {
          list.map((item) => {
            return (
              <li
                key={item.id}
                className="store-list-item flex-row flex-align-center"
                onClick={() => handleStoreClick(item.longitude, item.latitude)}
              >
                <div className="store-list-item-left">
                  <div className="store-list-item-title">{item.name}</div>
                  <div className="store-list-item-desc">联系电话：{item.phone}</div>
                  <div className="store-list-item-address">{item.address}</div>
                </div>
                <div className="store-list-item-right flex">
                  <div className="iconfont">&#xe790;</div>
                  <span className="distance">{item.distance}</span>
                </div>
              </li>
            )
          })
        }
      </ul>   
    </div>
  )
}

export default ByStore;