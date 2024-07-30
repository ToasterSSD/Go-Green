import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import UserProfile from './pages/UserProfile';
// Import other components as needed

const AdminRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />
      <Route path="/admin" element={<AdminPanel />} /> {/* Ensure this points to AdminPanel */}
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

// Placeholder components for other routes
const Categories = () => <div>Categories</div>;
const Feedback = () => <div>Feedback</div>;

export default AdminRouting;
