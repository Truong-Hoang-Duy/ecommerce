import Heading from '../../components/layout/Heading';
import Products from '../products/Products';
import styled from 'styled-components';
import { Loading } from '../../components/loading';

const HomeProductStyles = styled.div`
  margin-bottom: 60px;
`;

const HomeProduct = () => {
  return (
    <HomeProductStyles>
      <div className="container">
        <Heading>Tất cả sản phẩm</Heading>
        <Products></Products>
      </div>
    </HomeProductStyles>
  );
};

export default HomeProduct;
