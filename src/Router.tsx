import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { NotFound } from './components/Common/NotFound';
import TopBar from './components/Common/TopBar';
import CategoryAddNew from './modules/category/CategoryAddNew';
import CategoryManage from './modules/category/CategoryManage';
import DashboardLayout from './modules/dashboard/DashboardLayout';
import PostAddNew from './modules/post/PostAddNew';
import PostManage from './modules/post/PostManage';
import UserAddNew from './modules/user/UserAddNew';
import UserManage from './modules/user/UserManage';
import UserProfile from './modules/user/UserProfile';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <TopBar />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: 'post/:slug', element: <PostDetailsPage /> },
    ],
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'manage/post',
        element: <PostManage />,
      },
      {
        path: 'manage/add-post',
        element: <PostAddNew />,
      },
      {
        path: 'manage/category',
        element: <CategoryManage />,
      },
      {
        path: 'manage/add-category',
        element: <CategoryAddNew />,
      },
      {
        path: 'manage/user',
        element: <UserManage />,
      },
      {
        path: 'manage/add-user',
        element: <UserAddNew />,
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
