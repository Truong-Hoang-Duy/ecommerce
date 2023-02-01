import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Button,
  Tooltip,
  Avatar,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LocalMall } from '@mui/icons-material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase-app/firebase-config';
import { authActions, CurrentUser } from '../../features/auth/authSlice';
import { useEffect } from 'react';

const TopBar = () => {
  const user = useAppSelector((state) => state.auth);
  const pages = ['Products', 'Blog', 'Contact'];
  const settings = [`Welcome ${user.currentUser?.displayName}`, 'Account', 'Logout'];
  const features = ['Log in', 'Log out'];

  const [anchorElNav, setAnchorElNav] = useState<EventTarget | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<EventTarget | null>(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.ChangeEvent<EventTarget>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page: string) => {
    setAnchorElNav(null);
    navigate(page.toLowerCase());
  };

  const handleClickNavMenu = (setting: string) => {
    switch (setting) {
      case 'Logout':
        signOut(auth);
        dispatch(authActions.logout());
        break;

      default:
        break;
    }
  };

  const handleOpenUserMenu = (event: React.ChangeEvent<EventTarget>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickFeature = (item: string) => {
    switch (item) {
      case 'Log in':
        navigate('/sign-in');
        break;

      default:
        navigate('/sign-up');
        break;
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };
        dispatch(authActions.loginSuccess(payload as CurrentUser));
      }
    });
  }, []);

  return (
    <>
      <div className="topbar">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <LocalMall sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                KARA
              </Typography>

              {/* mobile */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav as Element}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <LocalMall sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                KARA
              </Typography>
              {/* mobile */}

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{
                      color: 'white',
                      display: 'block',
                      fontWeight: 500,
                      mx: '20px',
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              {user.isLogin && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser as any}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        {setting.includes('Welcome') ? (
                          <Typography
                            sx={{
                              color: 'red',
                            }}
                          >
                            {setting}
                          </Typography>
                        ) : (
                          <Button
                            onClick={() => handleClickNavMenu(setting)}
                            sx={{
                              color: 'black',
                              display: 'block',
                              fontWeight: 500,
                              textAlign: 'center',
                            }}
                          >
                            {setting}
                          </Button>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}

              {!user.isLogin && (
                <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                  {features.map((item) => (
                    <Button
                      key={item}
                      onClick={() => handleClickFeature(item)}
                      sx={{
                        color: 'white',
                        display: 'inline-block',
                        fontWeight: 500,
                        mx: '1px',
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </div>
      <Outlet />
    </>
  );
};

export default TopBar;
