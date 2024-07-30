import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import http from '../http';  // Changed import from axios to http
import UserContext from '../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (user) {
            http.get(`/userview/${user.id}`)
                .then(response => setUserData(response.data))
                .catch(err => toast.error(`Error fetching user data: ${err.message}`));
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            http.get('/userview')
                .then(response => setAllUsers(response.data))
                .catch(err => toast.error(`Error fetching all users: ${err.message}`));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = () => {
        http.put(`/userview/${user.id}`, userData)
            .then(response => toast.success(response.data.message))
            .catch(err => toast.error(`Error updating user: ${err.message}`));
    };

    const handleDelete = () => {
        http.delete(`/userview/${user.id}`)
            .then(response => {
                toast.success(response.data.message);
                localStorage.clear();
                window.location = "/login";
            })
            .catch(err => toast.error(`Error deleting user: ${err.message}`));
    };

    return (
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ my: 2 }}>
                User Profile
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }}>
                <TextField
                    fullWidth margin="dense" autoComplete="off"
                    label="Name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth margin="dense" autoComplete="off"
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth margin="dense" autoComplete="off"
                    label="Password"
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={handleChange}
                />
                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleUpdate}>
                    Update
                </Button>
                <Button fullWidth variant="contained" color="error" sx={{ mt: 2 }} onClick={handleDelete}>
                    Delete
                </Button>
            </Box>
            <Typography variant="h6" sx={{ my: 4 }}>
                All Users
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '800px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Roles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell>{user.roles}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </Box>
    );
};

export default UserProfile;
