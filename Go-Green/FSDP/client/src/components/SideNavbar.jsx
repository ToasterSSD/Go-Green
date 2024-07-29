import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Dashboard, PostAdd, Category, Feedback } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const SideNavbar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin">
          <ListItemIcon>
            <PostAdd />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItem>
        <ListItem button component={Link} to="/categories">
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button component={Link} to="/feedback">
          <ListItemIcon>
            <Feedback />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavbar;
