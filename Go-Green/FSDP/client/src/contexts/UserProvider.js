// UserProvider.js
import React, { useState, useEffect } from 'react';
import http from '../http';
import UserContext from './UserContext'; // Import the context created in UserContext.js

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const response = await http.get('/user/auth');
          setUser(response.data.user);
          // Store user in localStorage to persist state
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (error) {
          console.error("Failed to fetch user", error);
          localStorage.clear();
          window.location = "/login";
        }
      };

      fetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
