import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const SideMenuListItem = ({ text, icon, open, link }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={[{ minHeight: 48, px: 2.5 }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
        >
          <ListItemIcon sx={[{ minWidth: 0, justifyContent: 'center' }, open ? { mr: 3 } : { mr: 'auto' }]}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideMenuListItem;
