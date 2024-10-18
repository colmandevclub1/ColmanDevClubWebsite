import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { UserAuth } from 'src/lib/auth/authContext';
import { pages } from './defintions';
import LogoAndTitle from './LogoAndTitle';

const MobileNavbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    await logout();
  };

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <Toolbar sx={{ display: { xs: 'flex', md: 'none' } }}>
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
        anchorEl={anchorElNav}
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
      >
        {pages.map((page) => (
          <NavLink key={page.title} to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page.title}</Typography>
            </MenuItem>
          </NavLink>
        ))}
        {user && (
          <MenuItem
            onClick={() => {
              handleLogout();
              handleCloseNavMenu();
            }}
          >
            Logout
          </MenuItem>
        )}

        {!user && (
          <>
            <NavLink to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Sign In</Typography>
              </MenuItem>
            </NavLink>
            <NavLink to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Join Us</Typography>
              </MenuItem>
            </NavLink>
          </>
        )}
      </Menu>
      <LogoAndTitle />
    </Toolbar>
  );
};

export default MobileNavbar;
