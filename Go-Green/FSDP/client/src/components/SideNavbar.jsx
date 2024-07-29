import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Dashboard, PostAdd, Category, Feedback } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const SideNavbar = () => {
  const location = useLocation();

  // Function to check if the item is active
  const isActive = (path) => location.pathname === path;

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
        <ListItem 
          button 
          component={Link} 
          to="/" 
          sx={{ 
            bgcolor: isActive('/') ? 'action.selected' : 'transparent',
            '&:hover': {
              bgcolor: 'action.hover',
            }
          }}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/profile" 
          sx={{ 
            bgcolor: isActive('/profile') ? 'action.selected' : 'transparent',
            '&:hover': {
              bgcolor: 'action.hover',
            }
          }}
        >
          <ListItemIcon>
            <PostAdd />
          </ListItemIcon>
          <ListItemText primary="User Profile" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/categories" 
          sx={{ 
            bgcolor: isActive('/categories') ? 'action.selected' : 'transparent',
            '&:hover': {
              bgcolor: 'action.hover',
            }
          }}
        >
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/feedback" 
          sx={{ 
            bgcolor: isActive('/feedback') ? 'action.selected' : 'transparent',
            '&:hover': {
              bgcolor: 'action.hover',
            }
          }}
        >
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
