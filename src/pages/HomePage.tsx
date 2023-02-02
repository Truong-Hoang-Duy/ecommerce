import HomeBanner from '../modules/home/HomeBanner';
import HomeFeature from '../modules/home/HomeFeature';
import HomeNewest from '../modules/home/HomeNewest';
import HomeProduct from '../modules/home/HomeProduct';

const HomePage = () => {
  return (
    <>
      <HomeBanner></HomeBanner>
      <HomeProduct></HomeProduct>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
    </>
  );
};

export default HomePage;
