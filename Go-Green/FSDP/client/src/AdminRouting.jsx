import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import AdminPanel from './pages/AdminPanel';
import UserProfile from './pages/UserProfile';
import Categories from './pages/Categories';
import Feedback from './pages/Feedback';
import SideNavbar from './SideNavbar'; // Ensure this is the correct path to your SideNavbar component

const AdminRouting = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}> {/* Adjust margin to account for the sidebar width */}
        <Routes>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<AdminPanel />} /> {/* Ensure this points to AdminPanel */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </Box>
    </Box>
  );
};



export default AdminRouting;
