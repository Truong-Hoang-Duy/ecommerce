import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { NotFound } from './components/Common/NotFound';
import TopBar from './components/Common/TopBar';
import HomePage from './pages/HomePage';
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
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
