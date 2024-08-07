import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../contexts/UserContext';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = yup.object({
        email: yup.string().trim()
            .email('Enter a valid email')
            .max(50, 'Email must be at most 50 characters')
            .required('Email is required'),
        password: yup.string().trim()
            .min(8, 'Password must be at least 8 characters')
            .max(50, 'Password must be at most 50 characters')
            .required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (data) => {
            data.email = data.email.trim().toLowerCase();
            data.password = data.password.trim();
            http.post("/user/login", data)
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    setUser(res.data.user);
                    navigate("/");
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                });
        }
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f6f8',
            padding: '20px'
        }}>
            <Card sx={{ maxWidth: 500, width: '100%', boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://via.placeholder.com/500x140"
                    alt="Card Image"
                />
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
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
                        <FormControlLabel
                            control={<Checkbox name="rememberMe" checked={formik.values.rememberMe} onChange={formik.handleChange} />}
                            label="Remember Me"
                            sx={{ mt: 2 }}
                        />
                        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
                            Login
                        </Button>
                    </Box>
                    <Button fullWidth variant="text" sx={{ mt: 2 }} onClick={() => navigate("/forgot-password")}>
                        Forgot Password?
                    </Button>
                </CardContent>
            </Card>
            <ToastContainer />
        </Box>
    );
}

export default Login;
