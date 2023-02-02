import { jsx } from '@emotion/react';

export type ChildrenProps = {
  children: JSX.Element | string;
  className?: string;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type CategoriesType = {
  id: string;
  name: string;
  slug: string;
  status: number;
};

export type PostsType = {
  id: string;
  categoryId: string;
  hot: boolean;
  image: string;
  image_name: string;
  slug: string;
  status: number;
  title: string;
  userId: string;
  createdAt: {
    seconds: number;
  };
};
