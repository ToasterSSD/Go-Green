import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, CssBaseline, Button, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Delete } from '@mui/icons-material';
import http from '../http';
import UserContext from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavbar from '../components/SideNavbar';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        roles: 'USER'
    });

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleAddUser = () => {
        http.post('/userview/users/add', newUser)
            .then(response => {
                toast.success(response.data.message);
                setAllUsers([...allUsers, response.data.user]);
                handleClose();
            })
            .catch(err => toast.error(`Error adding user: ${err.message}`));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <SideNavbar />
            <Box sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        All Users
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Add User
                    </Button>
                </Box>
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

                {/* Add User Modal */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={newUser.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={newUser.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={newUser.password}
                            onChange={handleInputChange}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="roles"
                                value={newUser.roles}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="USER">User</MenuItem>
                                <MenuItem value="ADMIN">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddUser} color="primary">
                            Add User
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default UserProfile;
