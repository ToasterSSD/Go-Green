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
    const [videoLinks, setVideoLinks] = useState(['']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get(`/learning/${id}`).then((res) => {
            const topicData = res.data;
            setTopic(topicData);
            setVideoLinks(topicData.videos || ['']);
            setLoading(false);
        });
    }, [id]);

    const formik = useFormik({
        initialValues: {
            title: topic ? topic.title : "",
            content: topic ? topic.content : "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().trim()
                .min(3, 'Title must be at least 3 characters')
                .max(100, 'Title must be at most 100 characters')
                .required('Title is required'),
            content: yup.string().trim()
                .required('Content is required'),
            videoLinks: yup.array().of(
                yup.string().url('Invalid URL').nullable()
            ).nullable()
        }),
        onSubmit: (data) => {
            const formData = new FormData();
            formData.append('title', data.title.trim());
            formData.append('content', data.content.trim());

            // Add video file to formData
            if (videoFile) {
                formData.append('videoFile', videoFile);
            }

            // Add video links to formData
            formData.append('videoLinks', JSON.stringify(videoLinks.filter(link => link)));

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

    const handleVideoLinkChange = (index, event) => {
        const newVideoLinks = [...videoLinks];
        newVideoLinks[index] = event.target.value;
        setVideoLinks(newVideoLinks);
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

                                {videoLinks.map((link, index) => (
                                    <TextField
                                        key={index}
                                        fullWidth margin="dense" autoComplete="off"
                                        label={`Video Link ${index + 1}`}
                                        value={link}
                                        onChange={(event) => handleVideoLinkChange(index, event)}
                                        error={formik.touched.videoLinks && formik.errors.videoLinks}
                                        helperText={formik.touched.videoLinks && formik.errors.videoLinks}
                                    />
                                ))}

                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <Button variant="contained" component="label">
                                        Upload Video
                                        <input hidden accept="video/*" type="file" onChange={onFileChange} />
                                    </Button>
                                    <Button variant="contained" type="submit" sx={{ ml: 2 }}>
                                        Update
                                    </Button>
                                    <Button variant="contained" sx={{ ml: 2 }} color="error"
                                        onClick={handleOpen}>
                                        Delete
                                    </Button>
                                </Box>
                                {videoFile && (
                                    <Box className="aspect-ratio-container" sx={{ mt: 1, mb: 1 }}>
                                        <video controls style={{ width: '100%', height: 'auto' }}>
                                            <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
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









