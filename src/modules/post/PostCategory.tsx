import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ChildrenProps } from '../../components/Common/types';

type ChildrenExtend = ChildrenProps & {
  type?: string;
  to?: string;
};
const PostCategoryStyles = styled.div<ChildrenExtend>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  background-color: #f3f3f3;

  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  ${(props) =>
    props.type === 'primary' &&
    css`
      background-color: ${(props) => props.theme.grayF3}; ;
    `};

  ${(props) =>
    props.type === 'secondary' &&
    css`
      background-color: white; ;
    `};
`;

const PostCategory = ({ children, type = 'primary', className = '', to = '/' }: ChildrenExtend) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyles>
  );
};

export default PostCategory;
