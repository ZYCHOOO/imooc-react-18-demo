/*
 * @Date: 2024-10-29 12:56:49
 * @LastEditors: 曾逸超
 * @LastEditTime: 2024-10-29 22:24:07
 * @FilePath: /react-learn/huanlegou/src/containers/Category/index.tsx
 */

import './style.scss';
import { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from "react-router-dom";
import { message } from '../../utils/message';
import { CategoryTagResponseType, CategoryProductListType } from './types';

function Category () {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [requestData, setRequestData] = useState({
    url: '/api/category/productlist',
    method: 'POST',
    data: {
      keyword: '',
      category: '',
      tag: '',
    }
  });

  const { request } = useRequest<CategoryTagResponseType>({ manual: true });
  const { data } = useRequest<CategoryProductListType>(requestData);
  const productList = data?.data || [];

  // 侧边切换
  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
    const newRequestData = {...requestData};
    newRequestData.data.category = category;
    setRequestData(newRequestData);
  }

  // 标签切换
  const handleTagClick = (tag: string) => {
    setCurrentTag(tag);
    const newRequestData = {...requestData};
    newRequestData.data.tag = tag;
    setRequestData(newRequestData);
  }

  // 输入框值变化处理
  const handleKeywordChange = (key: string) => {
    if (key === 'Enter') {
      const newRequestData = {...requestData};
      newRequestData.data.keyword = keyword;
      setRequestData(newRequestData);
    }
  }

  useEffect(() => {
    request({
      url: '/api/categoryandtag',
      method: 'GET'
    }).then((res) => {
      const data = res.data;
      setCategories(data.category || []);
      setTags(data.tag || []);
    }).catch((error) => {
      message(error?.message);
    })
  }, [request]);

  return (
    <div className="page category-page">
      <div className='category-page-header'>
        <div
          className="iconfont back-icon"
          onClick={() => navigate(-1)}
        >
          &#xe600;
        </div>
        <span>分类</span>
      </div>

      <div className="search">
        <div className="iconfont search-icon">&#xe610;</div>
        <input
          value={keyword}
          className="search-input"
          placeholder="请输入商品名称"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => handleKeywordChange(e.key)}
        />
      </div>

      <div className="category-page-content">
        <div className="category">
          <div
            className={currentCategory === '' ? 'category-item is-active' : 'category-item'}
            onClick={() => handleCategoryClick('')}
          >
            全部商品
          </div>
          {
            categories.map((category) => (
              <div
                key={category.id}
                className={currentCategory === category.id ? 'category-item is-active' : 'category-item'}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </div>
            ))
          }
        </div>
        <div className="category-content">
          <div className="tags">
            <div
              className={currentTag === '' ? 'tag-item is-active' : 'tag-item'}
              onClick={() => handleTagClick('')}
            >
              全部
            </div>
            {
              tags.map((tag, index) => (
                <div
                  key={index}
                  className={currentTag === tag ? 'tag-item is-active' : 'tag-item'}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </div>
              ))
            }
          </div>
          <div className="list">
            <div className="list-total">精选商品（{productList.length}）</div>
            {
              productList.map((product) => (
                <div key={product.id} className="list-item">
                  <img src={product.imgUrl} alt="" />
                  <div className="list-item-content">
                    <div className="list-item-title">{product.name}</div>
                    <div className="list-item-sales">月售{product.sales}</div>
                    <div className="list-item-price">
                      <span className="yen">&yen;</span>
                      <span>{product.price}</span>
                    </div>
                    <div className="list-item-btn">购买</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* 底部 */}
      <div className="docker">
        <div className="docker-item">
          <span className="iconfont">&#xe6f9;</span>
          <span className='docker-item-title'>首页</span>
        </div>
        <div className="docker-item is-active">
          <span className="iconfont">&#xe603;</span>
          <span className='docker-item-title'>分类</span>
        </div>
        <div className="docker-item">
          <span className="iconfont">&#xe826;</span>
          <span className='docker-item-title'>购物车</span>
        </div>
        <div className="docker-item">
          <span className="iconfont">&#xe691; </span>
          <span className='docker-item-title'>我的</span>
        </div>
      </div>
    </div>
  )
}

export default Category;