import * as React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack, Box, Divider, IconButton, List } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar, Drawer, DrawerHeader } from './Layout.styles';
import { primaryList, secondaryList, tertiaryList } from '../../routes';
import { SideMenuListItem } from '../../components';

const Layout = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar color="secondary" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 5 }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome !
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Stack justifyContent="space-between" height="100%">
          <Stack>
            <DrawerHeader>
              <IconButton color="primary" onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List sx={{ paddingX: '.5rem' }}>
              {primaryList.map((item) => (
                <SideMenuListItem key={item.text} open={open} {...item} />
              ))}
            </List>
            <Divider />
            <List sx={{ paddingX: '.5rem' }}>
              {secondaryList.map((item) => (
                <SideMenuListItem key={item.text} open={open} {...item} />
              ))}
            </List>
          </Stack>
          <Stack>
            <Divider />
            <List sx={{ paddingX: '.5rem' }}>
              {tertiaryList.map((item) => (
                <SideMenuListItem key={item.text} open={open} {...item} />
              ))}
            </List>
          </Stack>
        </Stack>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
