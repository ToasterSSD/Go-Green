import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get(`/article/${id}`).then((res) => {
            setArticle(res.data);
            setImagePreview(res.data.imageFile ? `${import.meta.env.VITE_FILE_BASE_URL}${res.data.imageFile}` : null);
            setLoading(false);
        });
    }, [id]);

    const formik = useFormik({
        initialValues: {
            title: "",
            category: "",
            author: "",
            content: ""
        },
        enableReinitialize: true,
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
            const formData = new FormData();
            formData.append('title', data.title.trim());
            formData.append('category', data.category.trim());
            formData.append('author', data.author.trim());
            formData.append('content', data.content.trim());
            if (imageFile) {
                formData.append('imageFile', imageFile);
            }

            http.put(`/article/${id}`, formData, {
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
                    toast.error('Failed to update article');
                });
        }
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteArticle = () => {
        http.delete(`/article/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/articles");
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to delete article');
            });
    }

    const onFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                toast.error('Maximum file size is 1MB');
                return;
            }
            setImageFile(file);  // Directly set the file without uploading it separately
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Article
            </Typography>
            {
                !loading && (
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
                                {formik.touched.content && formik.errors.content ? (
                                    <Typography color="error" variant="body2">
                                        {formik.errors.content}
                                    </Typography>
                                ) : null}
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Box sx={{ textAlign: 'center', mt: 2 }} >
                                    <Button variant="contained" component="label">
                                        Upload Image
                                        <input hidden accept="image/*" type="file"
                                            onChange={onFileChange} />
                                    </Button>
                                    {
                                        imagePreview && (
                                            <Box className="aspect-ratio-container" sx={{ mt: 2 }}>
                                                <img alt="article"
                                                    src={imagePreview}
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
                                Update
                            </Button>
                            <Button variant="contained" sx={{ ml: 2 }} color="error"
                                onClick={handleOpen}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                )
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Article
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this article?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={deleteArticle}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </Box>
    );
}

export default EditArticle;




