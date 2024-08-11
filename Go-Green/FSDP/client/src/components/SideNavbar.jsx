import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, IconButton, Divider } from '@mui/material';
import { PostAdd, Category, Feedback, AdminPanelSettings, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;
const collapsedWidth = 60;

const SideNavbar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: isCollapsed ? collapsedWidth : drawerWidth, 
          boxSizing: 'border-box', 
          bgcolor: '#333', 
          color: '#fff', 
          overflowX: 'hidden',
          position: 'fixed', // Ensure the drawer stays fixed
          height: '100vh', // Full height of the viewport
          zIndex: 1400, // Higher z-index to stay above the dialog
        },
      }}
    >
      <Toolbar>
        <IconButton onClick={toggleCollapse} sx={{ color: '#fff' }}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
        {!isCollapsed && (
          <Typography variant="h6" noWrap sx={{ color: '#fff', ml: 1 }}>
            Admin Panel
          </Typography>
        )}
      </Toolbar>
      <Divider />
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/admin" 
          sx={{ 
            bgcolor: isActive('/admin') ? 'action.selected' : 'transparent',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }, // Make the box slightly darker on hover
            color: '#fff',
            justifyContent: isCollapsed ? 'center' : 'initial',
            px: isCollapsed ? 2 : 3,
          }}
        >
          <ListItemIcon sx={{ color: '#fff', minWidth: isCollapsed ? 0 : 56 }}>
            <AdminPanelSettings />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Admin Panel" />}
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/profile" 
          sx={{ 
            bgcolor: isActive('/profile') ? 'action.selected' : 'transparent',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }, // Make the box slightly darker on hover
            color: '#fff',
            justifyContent: isCollapsed ? 'center' : 'initial',
            px: isCollapsed ? 2 : 3,
          }}
        >
          <ListItemIcon sx={{ color: '#fff', minWidth: isCollapsed ? 0 : 56 }}>
            <PostAdd />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="User Profile" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavbar;
