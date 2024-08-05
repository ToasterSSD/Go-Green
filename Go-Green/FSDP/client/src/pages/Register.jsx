import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, Switch, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
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

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            rememberMe: false
        },
        validationSchema: yup.object({
            name: yup.string().trim()
                .min(3, 'Name must be at least 3 characters')
                .max(50, 'Name must be at most 50 characters')
                .required('Name is required')
                .matches(/^[a-zA-Z '-,.]+$/, "Name only allow letters, spaces and characters: ' - , ."),
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
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.email = data.email.trim().toLowerCase();
            data.password = data.password.trim();
            http.post(isAdmin ? "/admin/register" : "/user/register", data)
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

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f6f8'
        }}>
            <Card sx={{ maxWidth: 500, p: 2 }}>
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
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
                            sx={{ mt: 2 }}
                        />
                        <Button fullWidth variant="contained" sx={{ mt: 2 }}
                            type="submit">
                            Register
                        </Button>
                    </Box>
                    <FormControlLabel
                        control={<Switch checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />}
                        label="Register as Admin"
                        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                    />
                    <Button fullWidth variant="text" sx={{ mt: 2 }} onClick={() => navigate("/forgot-password")}>
                        Forgot Password?
                    </Button>
                </CardContent>
            </Card>
            <ToastContainer />
        </Box>
    );
}

export default Register;
