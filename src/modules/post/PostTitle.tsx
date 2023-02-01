import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ChildrenProps } from '../../components/Common/types';

type ChildrenExtend = ChildrenProps & {
  size?: string;
  to?: string;
};

const PostTitleStyles = styled.h3<ChildrenExtend>`
  font-weight: 600;
  line-height: 1.5;
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  ${(props) =>
    props.size === 'normal' &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === 'big' &&
    css`
      font-size: 22px;
    `};
`;

const PostTitle = ({ children, className = '', size = 'normal', to = '/' }: ChildrenExtend) => {
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
