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

function EditLearningTopic() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [topic, setTopic] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get(`/learning/${id}`).then((res) => {
            setTopic(res.data);
            setLoading(false);
        });
    }, [id]);

    const formik = useFormik({
        initialValues: {
            title: topic ? topic.title : "",
            content: topic ? topic.content : ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().trim()
                .min(3, 'Title must be at least 3 characters')
                .max(100, 'Title must be at most 100 characters')
                .required('Title is required'),
            content: yup.string().trim()
                .required('Content is required')
        }),
        onSubmit: (data) => {
            const formData = new FormData();
            formData.append('title', data.title.trim());
            formData.append('content', data.content.trim());

            if (videoFile) {
                formData.append('videoFile', videoFile);
            }

            http.put(`/learning/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    console.log(res.data);
                    navigate("/learning");
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Failed to update learning topic');
                });
        }
    });

    const onFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file.size > 200 * 1024 * 1024) { // 200MB limit
                toast.error('Maximum file size is 200MB');
                return;
            }
            setVideoFile(file);  // Directly set the file without uploading it separately
        }
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteLearningTopic = () => {
        http.delete(`/learning/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/learning");
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to delete learning topic');
            });
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Learning Topic
            </Typography>
            {
                !loading && (
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                                <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>Content</Typography>
                                <Editor
                                    apiKey="kehqc691ze20c4gfvdx0ygcfxqj44cnvihun8288yuumakuy"
                                    value={formik.values.content}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help'
                                    }}
                                    onEditorChange={(content) => formik.setFieldValue('content', content)}
                                />
                                {formik.touched.content && formik.errors.content ? (
                                    <Typography color="error" variant="body2">
                                        {formik.errors.content}
                                    </Typography>
                                ) : null}
                                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                    Upload Video
                                    <input hidden accept="video/*" type="file" onChange={onFileChange} />
                                </Button>
                                {videoFile && (
                                    <Box className="aspect-ratio-container" sx={{ mt: 2 }}>
                                        <video controls style={{ width: '100%', height: 'auto' }}>
                                            <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Box>
                                )}
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
                    Delete Learning Topic
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this learning topic?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={deleteLearningTopic}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </Box>
    );
}

export default EditLearningTopic;


