import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { useNavigate } from 'react-router-dom';

function AddArticle() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: yup.object({
            newsName: yup.string().trim()
                .min(3, 'Title must be at least 3 characters')
                .max(30, 'Title must be at most 30 characters')
                .required('Title is required'),
            newsCat: yup.string().trim()
                .min(3, 'Description must be at least 3 characters')
                .max(30, 'Description must be at most 30 characters')
                .required('Description is required')
        }),
        onSubmit: (data) => {
            data.newsName = data.newsName.trim();
            data.newsCat = data.newsCat.trim();
            http.post("/article", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/articles");
                });
        }
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Article
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="dense" autoComplete="off"
                    label="Title"
                    name="title"
                    value={formik.values.newsName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.newsName && Boolean(formik.errors.title)}
                    helperText={formik.touched.newsName && formik.errors.title}
                />
                <TextField
                    fullWidth margin="dense" autoComplete="off"
                    multiline minRows={2}
                    label="NewsCat"
                    name="newsCat"
                    value={formik.values.newsCat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.newsCat && Boolean(formik.errors.title)}
                    helperText={formik.touched.newsCat && formik.errors.title}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AddArticle