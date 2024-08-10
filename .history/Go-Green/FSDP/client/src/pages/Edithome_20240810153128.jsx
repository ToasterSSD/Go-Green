  import React, { useState, useEffect, useContext } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { Box, Typography, TextField, Button, Grid } from "@mui/material";
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@mui/material";
  import http from "../http";
  import { useFormik } from "formik";
  import * as yup from "yup";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import UserContext from "../contexts/UserContext";

  function EditHome() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [homeContent, setHomeContent] = useState({
      section: "",
      title: "",
      description: "",
      buttonText: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      http.get(`/homepage/${id}`).then((res) => {
        setHomeContent(res.data);
        setImageFile(res.data.imageFile);
        setLoading(false);
      });
    }, [id]);

    const formik = useFormik({
      initialValues: homeContent,
      enableReinitialize: true,
      validationSchema: yup.object({
        section: yup
          .string()
          .trim()
          .min(3, "Section must be at least 3 characters")
          .max(200, "Section must be at most 200 characters")
          .required("Section is required"),
        title: yup
          .string()
          .trim()
          .min(3, "Title must be at least 3 characters")
          .max(200, "Title must be at most 200 characters")
          .required("Title is required"),
        description: yup
          .string()
          .trim()
          .min(3, "Description must be at least 3 characters")
          .max(5000, "Description must be at most 5000 characters")
          .required("Description is required"),
        buttonText: yup
          .string()
          .trim()
          .min(3, "Button text must be at least 3 characters")
          .max(200, "Button text must be at most 200 characters")
          .required("Button text is required"),
      }),
      onSubmit: (data) => {
        if (imageFile) {
          data.imageFile = imageFile;
        }
        data.section = data.section.trim();
        data.title = data.title.trim();
        data.description = data.description.trim();
        data.buttonText = data.buttonText.trim();

        if (data.description.length > 5000) {
          toast.error("Description must be at most 5000 characters.");
          return;
        }

        http
          .put(`/homepage/${id}`, data)
          .then((res) => {
            toast.success("Home page content updated successfully.");
            navigate("/");
          })
          .catch((error) => {
            toast.error("Failed to update home page content.");
          });
      },
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const deleteHomeContent = () => {
      http
        .delete(`/homepage/${id}`)
        .then((res) => {
          toast.success("Home page content deleted successfully.");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Failed to delete home page content.");
        });
    };

    const onFileChange = (e) => {
      let file = e.target.files[0];
      if (file) {
        if (file.size > 1024 * 1024) {
          toast.error("Maximum file size is 1MB");
          return;
        }

        let formData = new FormData();
        formData.append("file", file);
        http
          .post("/file/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setImageFile(res.data.filename);
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    };

    return (
      <Box>
        <Typography variant="h5" sx={{ my: 2 }}>
          Edit Home Page Content
        </Typography>
        {!loading && (
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={8}>
                <TextField
                  fullWidth
                  margin="dense"
                  autoComplete="off"
                  label="Section"
                  name="section"
                  value={formik.values.section}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.section && Boolean(formik.errors.section)}
                  helperText={formik.touched.section && formik.errors.section}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  autoComplete="off"
                  label="Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  autoComplete="off"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
                <TextField
                  fullWidth
                  margin="dense"
                  autoComplete="off"
                  label="Button Text"
                  name="Routing Text ("
                  value={formik.values.buttonText}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.buttonText && Boolean(formik.errors.buttonText)
                  }
                  helperText={
                    formik.touched.buttonText && formik.errors.buttonText
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={onFileChange}
                    />
                  </Button>
                  {imageFile && (
                    <Box className="aspect-ratio-container" sx={{ mt: 2 }}>
                      <img
                        alt="home-content"
                        src={`${import.meta.env.VITE_FILE_BASE_URL}${imageFile}`}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" type="submit">
                Update
              </Button>
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                color="error"
                onClick={handleOpen}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Home Page Content</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this home page content?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={deleteHomeContent}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </Box>
    );
  }

  export default EditHome;
