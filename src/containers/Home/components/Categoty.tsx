/*
 * @Date: 2024-10-21 12:26:15
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-21 12:56:49
 * @FilePath: /react-learn/huanlegou/src/containers/Home/components/Categoty.tsx
 */
import { categoriesType } from '../types';

type categoryPropsType = {
  categories: categoriesType | undefined
};

const Category = (props: categoryPropsType) => {

  const { categories } = props;

  return (
    <div className="category">
      {
        (categories || []).map((item) => {
          return (
            <div key={item.id} className="category-item">
              <img src={item.imgUrl} alt={item.name} />
              <p>{ item.name }</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Category;