import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddFeedback() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      content: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(200, "Name must be at most 200 characters")
        .required("Name is required"),
     email: yup
        .string()
        .trim()
        .min(3, "Email must be at least 3 characters")
        .max(200, "Email must be at most 20 characters")
        .required("Email is required"),
      content: yup
        .string()
        .trim()
        .min(3, "Content must be at least 3 characters")
        .max(2000, "Content must be at most 2000 characters")
        .required("Content is required"),
    }),
    onSubmit: (data) => {
      if (imageFile) {
        data.imageFile = imageFile;
      }
      data.name = data.name.trim();
      data.email = data.email.trim();
      data.content = data.content.trim();
      http.post("/feedback", data).then((res) => {
        console.log(res.data);
        navigate("/feedback");
      });
    },
  });

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
        .catch(function (error) {
          console.log(error.response);
        });
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Add Feedback
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={8}>
            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              multiline
              minRows={2}
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && Boolean(formik.errors.email)
              }
              helperText={
                formik.touched.email && formik.errors.email
              }
            />
            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              multiline
              minRows={2}
              label="Content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.content && Boolean(formik.errors.content)
              }
              helperText={
                formik.touched.content && formik.errors.content
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
                    alt="feedback"
                    src={`${import.meta.env.VITE_FILE_BASE_URL}${imageFile}`}
                  ></img>
                </Box>
              )}
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

export default AddFeedback;
