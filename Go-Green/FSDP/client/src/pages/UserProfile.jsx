import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, CssBaseline } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import http from '../http';
import UserContext from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavbar from '../components/SideNavbar';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (user) {
            http.get('/userview')
                .then(response => setAllUsers(response.data))
                .catch(err => toast.error(`Error fetching all users: ${err.message}`));
        }
    }, [user]);

    const handleUpdate = (userId) => {
        // Handle update logic here, you may want to navigate to a different page or open a modal for update
        console.log(`Update user with ID: ${userId}`);
    };

    const handleDelete = (userId) => {
        http.delete(`/userview/${userId}`)
            .then(response => {
                toast.success(response.data.message);
                setAllUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            })
            .catch(err => toast.error(`Error deleting user: ${err.message}`));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <SideNavbar />
            <Box sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ my: 2, textAlign: 'center' }}>
                    All Users
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '1400px', borderRadius: 2, boxShadow: 3, overflowX: 'auto' }}>
                        <Table sx={{ minWidth: 1200 }}>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>ID</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>Name</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>Email</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>Password</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>Roles</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUsers.map((user) => (
                                    <TableRow key={user.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>{user.id}</TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>{user.name}</TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>{user.email}</TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>{user.password}</TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>{user.roles}</TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }} align="center">
                                            <Tooltip title="Update">
                                                <IconButton onClick={() => handleUpdate(user.id)}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton color="error" onClick={() => handleDelete(user.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default UserProfile;
