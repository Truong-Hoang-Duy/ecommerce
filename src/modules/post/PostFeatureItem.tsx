import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import styled from 'styled-components';
import { CategoriesType, PostsType, UserType } from '../../components/Common/types';
import { db } from '../../firebase-app/firebase-config';
import PostCategory from './PostCategory';
import PostImage from './PostImage';
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

const PostFeatureItem = ({ data }: { data: PostsType }) => {
  const [category, setCategory] = useState<CategoriesType>();
  const [user, setUser] = useState<UserType>();
  const date = new Date(data?.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString('vi-VI');

  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, 'categories', data.categoryId);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data() as CategoriesType);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      if (data.userId) {
        const docRef = doc(db, 'users', data.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.data) {
          setUser(docSnap.data() as UserType);
        }
      }
    }
    fetchUser();
  }, []);

  if (!data || !data.id) return null;
  return (
    <PostFeatureItemStyles>
      <PostImage url={data.image} alt="clothes"></PostImage>

      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && <PostCategory to={category.slug}>{category?.name}</PostCategory>}
          <PostMeta
            to={slugify((user?.name as any) || '', { lower: true })}
            authorName={user?.name}
            date={formatDate}
          ></PostMeta>
        </div>
        <PostTitle to={`post/${data.slug}`} size="big">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
