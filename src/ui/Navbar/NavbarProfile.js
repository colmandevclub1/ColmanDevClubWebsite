import { Logout, Person, Settings } from '@mui/icons-material';
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserAuth } from 'src/lib/auth/authContext';

const NavbarProfile = () => {
  const { user, logout, isLoading } = UserAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user)
    return (
      <Stack gap={1} direction={'row'}>
        <Button LinkComponent={NavLink} variant="navlink" to="/signin">
          Sign In
        </Button>
        <Button LinkComponent={NavLink} variant="navlink-secondary" to="/signup">
          Join Us
        </Button>
      </Stack>
    );

  if (isLoading) return <CircularProgress />;

  return (
    <Stack direction={'row'} alignItems={'center'} gap={3} bgcolor={'#1F1F53'} px={2} borderRadius={2}>
      <Typography>{`Hello, ${user?.displayName}`}</Typography>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar src={user?.photoURL} />
      </IconButton>
      <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}>
        <MenuItem onClick={handleClose} disabled>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} disabled>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default NavbarProfile;
