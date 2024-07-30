import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import SideNavbar from '../components/SideNavbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]); // Initialize state with an empty array

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Assume accessToken is stored in localStorage or some state management solution
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          throw new Error('No access token found');
        }

        // Fetch users with authorization
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        

        // Check if response data is an array, if not, set it to an empty array
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          
          setUsers([]); // Set empty array as a fallback
          toast.error('Unexpected response format from server');
        }
      } catch (error) {
        if (error.response) {
          // The request was made, but the server responded with a status code outside the range of 2xx
          
          toast.error(
            error.response.data.message ||
              'Error fetching users from the server'
          );
        } else if (error.request) {
          // The request was made, but no response was received
          toast.error(
            'No response from the server. Check your network or server status.'
          );
        } else {
          // Something happened in setting up the request
          
          toast.error('Error setting up the request: ' + error.message);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideNavbar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            User Profiles
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>User Role</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.roles}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="View">
                          <IconButton>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;
