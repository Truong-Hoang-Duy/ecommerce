import styled from 'styled-components';
import PostCategory from './PostCategory';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;

const PostFeatureItem = () => {
  return (
    <PostFeatureItemStyles>
      <img
        src="https://cdn.shortpixel.ai/spai2/w_1570+q_lossless+ret_img+to_webp/https://zofal.vn/wp-content/uploads/2023/01/trang-phuc-cuoi-nam.jpg"
        alt="unsplash"
        className="post-image"
      />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory>Kiến thức</PostCategory>
          <PostMeta></PostMeta>
        </div>
        <PostTitle size="big">
          5 mẫu áo khoác nữ mùa đông đẹp dễ mặc không thể thiếu trong tủ đồ
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
