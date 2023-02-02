import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Heading from '../../components/layout/Heading';
import { db } from '../../firebase-app/firebase-config';
import PostFeatureItem from '../post/PostFeatureItem';

const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, 'posts');
    const q = query(colRef, where('status', '==', 1), where('hot', '==', true), limit(3));
    onSnapshot(q, (snapshot) => {
      const results: any = [];
      snapshot.forEach((docs) => {
        results.push({
          id: docs.id,
          ...docs.data(),
        });
      });
      setPostData(results);
    });
  }, []);
  if (postData.length <= 0) return null;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {postData.map((post: any) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
