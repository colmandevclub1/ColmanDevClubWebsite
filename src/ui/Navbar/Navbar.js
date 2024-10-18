import { NavLink, useLocation } from 'react-router-dom';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import { UserAuth } from 'src/lib/auth/authContext';
import { pages } from './defintions';
import LogoAndTitle from './LogoAndTitle';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AppBar position="sticky" color="secondary" sx={{ borderBottom: '1px solid #1F1F53' }}>
      <Toolbar
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'space-between',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          <LogoAndTitle />
          {pages.map((page) => (
            <Button
              key={page.title}
              LinkComponent={NavLink}
              to={page.path}
              variant="navlink"
              sx={{ color: pathname === page.path ? 'primary.main' : 'inherit' }}
            >
              {page.title}
            </Button>
          ))}
        </Toolbar>
        <Stack gap={1} display={user ? 'flex' : 'none'} direction={'row'}>
          <Typography>{`Hello, ${user?.fullName}`}</Typography>
          <Button variant="navlink-secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
        <Stack gap={1} display={!user ? 'flex' : 'none'} direction={'row'}>
          <Button LinkComponent={NavLink} variant="navlink" to="/signin">
            Sign In
          </Button>
          <Button LinkComponent={NavLink} variant="navlink-secondary" to="/signup">
            Join Us
          </Button>
        </Stack>
      </Toolbar>
      <MobileNavbar />
    </AppBar>
  );
};

export default Navbar;
