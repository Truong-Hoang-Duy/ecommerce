import {
  CategoryOutlined,
  Dashboard,
  LocalMall,
  Logout,
  PersonOutline,
  PostAddOutlined,
} from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebase-app/firebase-config';

const SidebarStyles = styled.div`
  width: 300px;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 12px;
  .sidebar-logo {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 0 20px;
    img {
      max-width: 40px;
    }
    margin-bottom: 20px;
    padding: 20px 20px 0;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    font-weight: 500;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 20px;
    cursor: pointer;
    text-decoration: none;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }
`;
const sidebarLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: <Dashboard></Dashboard>,
  },
  {
    title: 'Post',
    url: '/manage/post',
    icon: <PostAddOutlined></PostAddOutlined>,
  },
  {
    title: 'Category',
    url: '/manage/category',
    icon: <CategoryOutlined></CategoryOutlined>,
  },
  {
    title: 'User',
    url: '/manage/user',
    icon: <PersonOutline></PersonOutline>,
  },
  {
    title: 'Logout',
    url: '/',
    icon: <Logout></Logout>,
    onClick: () => {
      signOut(auth);
    },
  },
];

const Sidebar = () => {
  return (
    <SidebarStyles className="sidebar">
      <NavLink to="/" className="sidebar-logo">
        <LocalMall color="success"></LocalMall>
        <span style={{ fontSize: '22px' }}>Kara</span>
      </NavLink>
      {sidebarLinks.map((link) => (
        <NavLink to={link.url} className="menu-item" key={link.title}>
          <span className="menu-icon">{link.icon}</span>
          <span className="menu-text">{link.title}</span>
        </NavLink>
      ))}
    </SidebarStyles>
  );
};

export default Sidebar;
