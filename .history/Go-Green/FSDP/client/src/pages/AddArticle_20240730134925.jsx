import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import 'react-toastify/dist/ReactToastify.css';

function AddArticle() {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [imageError, setImageError] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            category: "",
            author: "",
            content: ""
        },
        validationSchema: yup.object({
            title: yup.string().trim()
                .min(3, 'Title must be at least 3 characters')
                .max(30, 'Title must be at most 30 characters')
                .required('Title is required'),
            category: yup.string().trim()
                .min(3, 'Category must be at least 3 characters')
                .max(30, 'Category must be at most 30 characters')
                .required('Category is required'),
            author: yup.string().trim()
                .min(3, 'Author must be at least 3 characters')
                .max(30, 'Author must be at most 30 characters')
                .required('Author is required'),
            content: yup.string().trim()
                .required('Content is required')
        }),
        onSubmit: (data) => {
            if (!imageFile) {
                setImageError(true);
                toast.error('Image file is required');
                return;
            }

            const formData = new FormData();
            formData.append('title', data.title.trim());
            formData.append('category', data.category.trim());
            formData.append('author', data.author.trim());
            formData.append('content', data.content.trim());
            formData.append('imageFile', imageFile);

            http.post("/article", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    console.log(res.data);
                    navigate("/articles");
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Failed to add article');
                });
        }
    });

    const onFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                toast.error('Maximum file size is 1MB');
                return;
            }
            setImageFile(file);  // Directly set the file without uploading it separately
            setImageError(false); // Reset image error if file is selected
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Article
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={8}>
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="Category"
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Author"
                            name="author"
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.author && Boolean(formik.errors.author)}
                            helperText={formik.touched.author && formik.errors.author}
                        />
                        <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>Content</Typography>
                        <Editor
                            apiKey="kehqc691ze20c4gfvdx0ygcfxqj44cnvihun8288yuumakuy"
                            value={formik.values.content}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'autosave format insert',
                                    'emoticons hr pagebreak save'
                                ],
                                toolbar:
                                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | \
                                    alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | \
                                    forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | \
                                    fullscreen preview save print | insertfile image media pageembed template link anchor codesample | ltr rtl',
                                autosave_interval: "30s",
                                autosave_retention: "2m"
                            }}
                            onEditorChange={(content) => formik.setFieldValue('content', content)}
                        />
                        
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Button variant="contained" component="label">
                                Upload Image
                                <input hidden accept="image/*" type="file"
                                    onChange={onFileChange} />
                            </Button>
                            {imageError && (
                                <Typography color="error" variant="body2">
                                    Image file is required
                                </Typography>
                            )}
                            {
                                imageFile && (
                                    <Box className="aspect-ratio-container" sx={{ mt: 2 }}>
                                        <img alt="article"
                                            src={URL.createObjectURL(imageFile)}
                                            style={{ width: '100%', height: 'auto' }}>
                                        </img>
                                    </Box>
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>

            <ToastContainer />
        </Box>
    );
}

export default AddArticle;
