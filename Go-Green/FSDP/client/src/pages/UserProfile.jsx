import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, CssBaseline, Button, Avatar } from '@mui/material';
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

    const handleUpdateRole = (userId, role) => {
        http.put(`/userview/${userId}/role`, { role })
            .then(response => {
                toast.success(response.data.message);
                setAllUsers(prevUsers => prevUsers.map(user => 
                    user.id === userId ? { ...user, roles: role } : user
                ));
            })
            .catch(err => toast.error(`Error updating user role: ${err.message}`));
    };

    const handleDelete = (userId) => {
        http.delete(`/userview/${userId}`)
            .then(response => {
                toast.success(response.data.message);
                setAllUsers(prevUsers => prevUsers.filter(user => user.id !== userId).map((user, index) => ({
                    ...user,
                    id: index + 1
                })));
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
                    <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '1400px', borderRadius: 2, boxShadow: 3, maxHeight: '70vh', overflowY: 'auto' }}>
                        <Table sx={{ minWidth: 1200 }}>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>ID</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>Profile</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>Name</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>Email</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>Roles</TableCell>
                                    <TableCell sx={{ padding: '16px', fontSize: '1rem' }} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUsers.map((user, index) => (
                                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>
                                            <Avatar src="/path/to/profile/pic" alt={user.name} />
                                        </TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>{user.name}</TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>{user.email}</TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }}>{user.roles}</TableCell>
                                        <TableCell sx={{ padding: '16px', fontSize: '1rem' }} align="center">
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                                <Button onClick={() => handleUpdateRole(user.id, 'ADMIN')} variant="contained" color="primary" size="small">
                                                    Admin
                                                </Button>
                                                <Button onClick={() => handleUpdateRole(user.id, 'USER')} variant="contained" color="secondary" size="small">
                                                    User
                                                </Button>
                                                <Tooltip title="Delete">
                                                    <IconButton color="error" onClick={() => handleDelete(user.id)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
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
