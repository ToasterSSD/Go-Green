import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { PostAdd, Category, Feedback, AdminPanelSettings } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const SideNavbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#333', color: '#fff' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ color: '#fff' }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/admin" 
          sx={{ 
            bgcolor: isActive('/admin') ? 'action.selected' : 'transparent',
            '&:hover': { bgcolor: 'action.hover' },
            color: '#fff',
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}>
            <AdminPanelSettings />
          </ListItemIcon>
          <ListItemText primary="Admin Panel" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/profile" 
          sx={{ 
            bgcolor: isActive('/profile') ? 'action.selected' : 'transparent',
            '&:hover': { bgcolor: 'action.hover' },
            color: '#fff',
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}>
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
            '&:hover': { bgcolor: 'action.hover' },
            color: '#fff',
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}>
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
            '&:hover': { bgcolor: 'action.hover' },
            color: '#fff',
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}>
            <Feedback />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavbar;
