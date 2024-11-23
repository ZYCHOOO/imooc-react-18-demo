/*
 * @Date: 2024-10-29 12:56:49
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-11-17 22:05:44
 * @FilePath: /react-learn/huanlegou/src/containers/Category/index.tsx
 */

import './style.scss';
import { useEffect, useState, MouseEvent } from 'react';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from "react-router-dom";
import { message } from '../../utils/message';
import { CategoryTagResponseType, CategoryProductListType, ProductType, CartProductResponseType, CartProductType } from './types';
import Docker from '../../components/Docker';
import Popover from '../../components/Popover';

function Category () {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [cartTempCount, setCartTempCount] = useState(0);
  const [productInfo, setProductInfo] = useState({
    id: '', imgUrl: '', name: '', price: 0, count: 0
  })
  const [productList, setProductList] = useState<Array<ProductType>>([]);
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([]);
  const [tags, setTags] = useState<string[]>([]);

  const { request: tagRequest } = useRequest<CategoryTagResponseType>({ manual: true });
  const { request: productRequest } = useRequest<CategoryProductListType>({ manual: true });
  const { request: cartProductRequest } = useRequest<CartProductResponseType>({ manual: true })

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
      const { count } = res.data;
      setCartTempCount(count);
      setShowCart(true);
    }).catch((e) => {
      message(e.message);
    })
  }

  const changeCartTempCount = (count: number) => {
    if (count < 0) {
      setCartTempCount(0);
      return;
    }
    setCartTempCount(count);
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
      <div className="category-page-header flex flex-center">
        <div
          className="iconfont back-icon"
          onClick={() => navigate(-1)}
        >
          &#xe600;
        </div>
        <span>分类</span>
      </div>

      <div className="search flex flex-align-center">
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
            className={currentCategory === '' ? 'category-item is-active flex flex-center' : 'category-item flex flex-center'}
            onClick={() => setCurrentCategory('')}
          >
            全部商品
          </div>
          {
            categories.map((category) => (
              <div
                key={category.id}
                className={currentCategory === category.id ? 'category-item is-active flex flex-center' : 'category-item flex flex-center'}
                onClick={() => setCurrentCategory(category.id)}
              >
                {category.name}
              </div>
            ))
          }
        </div>
        <div className="category-content flex flex-column">
          <div className="tags flex">
            <div
              className={currentTag === '' ? 'tag-item is-active flex flex-center' : 'tag-item flex flex-center'}
              onClick={() => setCurrentTag('')}
            >
              全部
            </div>
            {
              tags.map((tag, index) => (
                <div
                  key={index}
                  className={currentTag === tag ? 'tag-item is-active flex flex-center' : 'tag-item flex flex-center'}
                  onClick={() => setCurrentTag(tag)}
                >
                  {tag}
                </div>
              ))
            }
          </div>
          <div className="list flex flex-column">
            <div className="list-total">精选商品（{productList.length}）</div>
            {
              productList.map((product) => (
                <div
                  key={product.id}
                  className="list-item flex"
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
                      className="list-item-btn flex flex-center"
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
                onClick={() => changeCartTempCount(cartTempCount - 1)}
              >
                -
              </span>
              <span className="cart-count-text">{cartTempCount}</span>
              <span
                className="cart-count-button"
                onClick={() => changeCartTempCount(cartTempCount + 1)}
              >
                +
              </span>
            </div>
          </div>
          <div className="cart-btns">
            <div className="cart-btn">加入购物车</div>
            <div className="cart-btn">立即购买</div>
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default Category;