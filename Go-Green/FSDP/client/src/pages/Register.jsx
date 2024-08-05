import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = yup.object({
        name: yup.string().trim()
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be at most 50 characters')
            .required('Name is required')
            .matches(/^[a-zA-Z '-,.]+$/, "Name only allows letters, spaces, and characters: ' - , ."),
        email: yup.string().trim()
            .email('Enter a valid email')
            .max(50, 'Email must be at most 50 characters')
            .required('Email is required'),
        password: yup.string().trim()
            .min(8, 'Password must be at least 8 characters')
            .max(50, 'Password must be at most 50 characters')
            .required('Password is required')
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "Password must have at least 1 letter and 1 number"),
        confirmPassword: yup.string().trim()
            .required('Confirm password is required')
            .oneOf([yup.ref('password')], 'Passwords must match'),
        rememberMe: yup.boolean()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            rememberMe: false
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.email = data.email.trim().toLowerCase();
            data.password = data.password.trim();
            const endpoint = isAdmin ? "/user/adminregister" : "/user/register";
            data.roles = isAdmin ? 'ADMIN' : 'USER';
            http.post(endpoint, data)
                .then((res) => {
                    navigate("/login");
                })
                .catch((err) => {
                    toast.error(`${err.response.data.message}`);
                });
        }
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleAdminToggle = () => {
        setIsAdmin(!isAdmin);
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: isAdmin ? '#808080' : '#f4f6f8',
            padding: '20px'
        }}>
            <Card sx={{ maxWidth: 500, width: '100%', boxShadow: 3, backgroundColor: isAdmin ? '#A9A9A9' : '#fff', color: '#000' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://via.placeholder.com/500x140"
                    alt="Card Image"
                />
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                        {isAdmin ? 'Admin Register' : 'User Register'}
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mb: 2,
                            bgcolor: isAdmin ? 'blue' : 'grey',
                            color: '#fff',
                            transition: 'background-color 0.3s ease',
                            '&:hover': { bgcolor: isAdmin ? 'darkblue' : 'darkgrey' }
                        }}
                        onClick={handleAdminToggle}
                    >
                        {isAdmin ? 'Admin Register' : 'User Register'}
                    </Button>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            InputLabelProps={{
                                style: { color: '#000' },
                            }}
                            InputProps={{
                                style: { color: '#000' },
                            }}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            InputLabelProps={{
                                style: { color: '#000' },
                            }}
                            InputProps={{
                                style: { color: '#000' },
                            }}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Password"
                            name="password" type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputLabelProps={{
                                style: { color: '#000' },
                            }}
                            InputProps={{
                                style: { color: '#000' },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            style={{ color: '#000' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Confirm Password"
                            name="confirmPassword" type={showConfirmPassword ? "text" : "password"}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            InputLabelProps={{
                                style: { color: '#000' },
                            }}
                            InputProps={{
                                style: { color: '#000' },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                            style={{ color: '#000' }}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox name="rememberMe" checked={formik.values.rememberMe} onChange={formik.handleChange} />}
                            label="Remember Me"
                            sx={{ mt: 2, color: '#000' }}
                        />
                        <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: isAdmin ? '#555' : '#1976d2', color: '#fff' }}
                            type="submit">
                            Register
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <ToastContainer />
        </Box>
    );
}

export default Register;
