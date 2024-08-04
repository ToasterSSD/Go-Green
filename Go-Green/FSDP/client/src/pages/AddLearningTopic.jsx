import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import 'react-toastify/dist/ReactToastify.css';

function AddLearningTopic() {
    const navigate = useNavigate();
    const [videoFile, setVideoFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: "",
            content: ""
        },
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

            http.post("/learning", formData, {
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
                    toast.error('Failed to add learning topic');
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

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Learning Topic
            </Typography>
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
                            apiKey="cs4qd53jal9cfhagqejsavnjreib4rxp8fjetmervpkma4b5"
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Button variant="contained" component="label">
                                Upload Video
                                <input hidden accept="video/*" type="file" onChange={onFileChange} />
                            </Button>
                            <Button variant="contained" type="submit" sx={{ ml: 2 }}>
                                Add
                            </Button>
                        </Box>
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
            </Box>

            <ToastContainer />
        </Box>
    );
}

export default AddLearningTopic;






