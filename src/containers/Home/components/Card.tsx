import { CardType } from '../types';

type cardPropsType = {
  title: string | undefined,
  list: CardType | undefined,
}

const Card = (props: cardPropsType) => {

  const { title, list } = props;

  return (
    <div className="card">
      <div className="card-header">
        <div className="title">
          <img src="http://statics.dell-lee.com/shopping/hot.png" alt={title} />
          <span>{ title }</span>
        </div>
        <div className="more">
          <span>更多</span>
          <div className="iconfont">&#xe614;</div>
        </div>
        
      </div>
      <div className="card-content">
        {
          (list || []).map((item) => {
            return (
              <div key={item.id} className="card-content-item">
                <img src={item.imgUrl} alt={item.name} />
                <span className="card-content-item-name">{item.name}</span>
                <div className="card-content-item-operate">
                  <span className="yen">&yen;</span>
                  <span className="price">{item.price}</span>
                  <div className="iconfont">&#xe611;</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Card;