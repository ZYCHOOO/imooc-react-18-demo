/*
 * @Date: 2024-10-29 12:56:49
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-11-24 18:26:22
 * @FilePath: /react-learn/huanlegou/src/containers/Category/index.tsx
 */

import './style.scss';
import { useEffect, useState, MouseEvent } from 'react';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from "react-router-dom";
import { message } from '../../utils/message';
import { CategoryTagResponseType, CategoryProductListType, ProductType, CartProductResponseType, CartProductType } from './types';
import { CartChangeResponseType } from '../../types';
import Docker from '../../components/Docker';
import Popover from '../../components/Popover';

function Category () {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [productInfo, setProductInfo] = useState<CartProductType>({
    id: '', imgUrl: '', name: '', price: 0, count: 0
  })
  const [productList, setProductList] = useState<Array<ProductType>>([]);
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([]);
  const [tags, setTags] = useState<string[]>([]);

  // 获取分类
  const { request: tagRequest } = useRequest<CategoryTagResponseType>({ manual: true });
  // 获取商品
  const { request: productRequest } = useRequest<CategoryProductListType>({ manual: true });
  // 获取购物车信息
  const { request: cartProductRequest } = useRequest<CartProductResponseType>({ manual: true })
  // 添加购物车
  const { request: cartChangeRequest } = useRequest<CartChangeResponseType>({ manual: true });


  const handleKeywordChange = (key: string, target: any) => {
    if (key === 'Enter') {
      setKeyword(target.value);
    }
  }

  const productClickHandler = (productId: string) => {
    navigate(`/detail/${productId}`);
  }

  const addCartHandler = (productId: string, event: MouseEvent) => {
    event.stopPropagation();
    cartProductRequest({
      url: '/api/cartProductInfo',
      method: 'Get',
      params: { productId }
    }).then((res) => {
      setProductInfo(res.data);
      setShowCart(true);
    }).catch((e) => {
      message(e.message);
    })
  }

  const changeCartCount = (type: string) => {
    const newProductInfo = { ...productInfo };
    const { count } = newProductInfo;
    if (type === 'add') {
      newProductInfo.count = count + 1;
    } else {
      newProductInfo.count = count - 1 < 0 ? 0 : count -1;
    }
    setProductInfo(newProductInfo);
  }

  const confirmCartHandler = () => {
    const { id, count } = productInfo;
    cartChangeRequest({
      url: '/api/changeCartCount',
      method: 'GET',
      params: { id, count }
    }).then((res) => {
      setShowCart(false);
    }).catch((e) => {
      message(e.message);
    })
  }

  useEffect(() => {
    tagRequest({
      url: '/api/categoryandtag',
      method: 'GET'
    }).then((res) => {
      const data = res.data;
      setCategories(data.category || []);
      setTags(data.tag || []);
    }).catch((error) => {
      message(error?.message);
    })
  }, [tagRequest]);

  useEffect(() => {
    productRequest({
      url: '/api/category/productlist',
      method: 'POST',
      data: {
        keyword,
        category: currentCategory,
        tag: currentTag
      }
    }).then((res) => {
      const productList = res.data;
      setProductList(productList);
    })
  }, [keyword, currentCategory, currentTag, productRequest])

  return (
    <div className="page category-page">
      <div className="category-page-header flex-row flex-center">
        分类
      </div>

      <div className="search flex-row flex-align-center">
        <div className="iconfont search-icon">&#xe610;</div>
        <input
          className="search-input"
          placeholder="请输入商品名称"
          onKeyDown={(e) => handleKeywordChange(e.key, e.target)}
        />
      </div>

      <div className="category-page-content">
        <div className="category">
          <div
            className={currentCategory === '' ? 'category-item is-active flex-row flex-center' : 'category-item flex-row flex-center'}
            onClick={() => setCurrentCategory('')}
          >
            全部商品
          </div>
          {
            categories.map((category) => (
              <div
                key={category.id}
                className={currentCategory === category.id ? 'category-item is-active flex-row flex-center' : 'category-item flex-row flex-center'}
                onClick={() => setCurrentCategory(category.id)}
              >
                {category.name}
              </div>
            ))
          }
        </div>
        <div className="category-content flex-row flex-column">
          <div className="tags flex-row">
            <div
              className={currentTag === '' ? 'tag-item is-active flex-row flex-center' : 'tag-item flex-row flex-center'}
              onClick={() => setCurrentTag('')}
            >
              全部
            </div>
            {
              tags.map((tag, index) => (
                <div
                  key={index}
                  className={currentTag === tag ? 'tag-item is-active flex-row flex-center' : 'tag-item flex-row flex-center'}
                  onClick={() => setCurrentTag(tag)}
                >
                  {tag}
                </div>
              ))
            }
          </div>
          <div className="list flex-row flex-column">
            <div className="list-total">精选商品（{productList.length}）</div>
            {
              productList.map((product) => (
                <div
                  key={product.id}
                  className="list-item flex-row"
                  onClick={() => productClickHandler(product.id)}
                >
                  <img src={product.imgUrl} alt="" />
                  <div className="list-item-content">
                    <div className="list-item-title">{product.name}</div>
                    <div className="list-item-sales">月售{product.sales}</div>
                    <div className="list-item-price">
                      <span className="yen">&yen;</span>
                      <span>{product.price}</span>
                    </div>
                    <div
                      className="list-item-btn flex-row flex-center"
                      onClick={(event) => addCartHandler(product.id, event)}
                    >
                      购买
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <Docker activeName="category" />

      <Popover
        show={showCart}
        outsideClickCallback={() => setShowCart(false)}
      >
        <div className="cart">
          <div className="cart-content">
            <img src={productInfo?.imgUrl} alt="" className="cart-content-img" />
            <div className="cart-content-info">
              <div className="cart-content-title">{productInfo.name}</div>
              <div className="cart-content-price">
                <span className="yen">&yen;</span>
                <span>{productInfo.price}</span>
              </div>
            </div>
          </div>
          <div className="cart-count">
            <div className="cart-count-title">购买数量</div>
            <div className="cart-count-counter">
              <span
                className="cart-count-button"
                onClick={() => changeCartCount('minus')}
              >
                -
              </span>
              <span className="cart-count-text">{productInfo.count}</span>
              <span
                className="cart-count-button"
                onClick={() => changeCartCount('add')}
              >
                +
              </span>
            </div>
          </div>
          <div className="cart-btns">
            <div className="cart-btn" onClick={() => confirmCartHandler()}>加入购物车</div>
            <div className="cart-btn">立即购买</div>
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default Category;