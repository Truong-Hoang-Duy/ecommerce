import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components/button';
import { Products as ProductsType } from '../../models';

const ProductsItemStyles = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 540px;
  .product-content {
    flex: 1;
  }
  .product-title {
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.primary};
    text-align: left;
    margin: 20px;
    height: 60px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product-img {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    padding: 10px 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 20px 20px 0 0;
  }

  .product-desc {
    margin: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product-price {
    text-align: center;
    font-size: 20px;
    color: ${(props) => props.theme.tertiary};
  }

  .product-button {
    appearance: none;
    background-color: #2ea44f;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    margin: 20px;
  }

  .product-button:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }

  .product-button:hover {
    background-color: #2c974b;
  }

  .product-button:focus {
    box-shadow: rgba(46, 164, 79, 0.4) 0 0 0 3px;
    outline: none;
  }

  .product-button:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, 0.1);
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
  }

  .product-button:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
  }
`;

const ProductsItem = ({ item }: { item: ProductsType }) => {
  return (
    <ProductsItemStyles>
      <div className="product-img">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="product-content">
        <h1 className="product-title">{item.title}</h1>
        <p className="product-desc">{item.description}</p>
        <h3 className="product-price">${item.price}</h3>
      </div>
      <button type="button" className="product-button">
        Add to cart
      </button>
    </ProductsItemStyles>
  );
};

export default ProductsItem;
