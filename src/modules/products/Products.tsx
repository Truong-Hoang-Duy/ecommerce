import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import productsApi from '../../../src/api/productsApi';
import { Loading } from '../../components/loading';
import { Products as ProductsType } from '../../models';
import ProductsItem from './ProductsItem';

const ProductsStyles = styled.div`
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #2c974b;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-radius: 100rem;
    display: inline-block;
    animation: spinner 1s infinite linear;
    @keyframes spinner {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const Products = () => {
  const [product, setProduct] = useState<ProductsType[]>();
  console.log('Products ~ product', product);
  useEffect(() => {
    productsApi.getAll().then((res) => setProduct(res));
  }, []);

  return (
    <ProductsStyles>
      {!product && <div className="spinner"></div>}

      <Grid container spacing={3}>
        {product &&
          product.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <ProductsItem item={item}></ProductsItem>
            </Grid>
          ))}
      </Grid>
    </ProductsStyles>
  );
};

export default Products;
