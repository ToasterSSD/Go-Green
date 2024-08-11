import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/UserContext";
import { Editor } from "@tinymce/tinymce-react";

function AddChat() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [imageFile, setImageFile] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowToast(true);
      setTimeout(() => {
        navigate("/chatarea");
      }, 2000);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (showToast) {
      toast.error("You do not have permission to add a post.");
    }
  }, [showToast]);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      link: "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title must be at most 200 characters")
        .required("Title is required"),
      content: yup
        .string()
        .trim()
        .min(3, "Content must be at least 3 characters")
        .max(5000, "Content must be at most 5000 characters")
        .required("Content is required"),
      link: yup.string().trim().url("Please enter a valid URL").nullable(),
    }),
    onSubmit: (data) => {
      if (imageFile) {
        data.imageFile = imageFile;
      }
      data.title = data.title.trim();
      data.content = data.content.trim();

      if (data.content.length > 5000) {
        toast.error("Content must be at most 5000 characters.");
        return;
      }

      http
        .post("/chatarea", data)
        .then((res) => {
          navigate("/chatarea");
        })
        .catch((error) => {
          toast.error("Failed to add post.");
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
        .catch((error) => {
          toast.error("Failed to upload image.");
        });
    }
  };

  if (!user) {
    return <ToastContainer />;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Create Post
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
              Content
            </Typography>
            <Editor
              apiKey="cs4qd53jal9cfhagqejsavnjreib4rxp8fjetmervpkma4b5"
              value={formik.values.content}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "autosave format insert",
                  "emoticons hr pagebreak save",
                ],
                toolbar:
                  "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | \
                                    alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | \
                                    forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | \
                                    fullscreen preview save print | insertfile image media pageembed template link anchor codesample | ltr rtl",
                autosave_interval: "30s",
                autosave_retention: "2m",
              }}
              onEditorChange={(content) =>
                formik.setFieldValue("content", content)
              }
            />
            {formik.touched.content && formik.errors.content ? (
              <Typography color="error" variant="body2">
                {formik.errors.content}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Link (Optional)"
              name="link"
              value={formik.values.link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.link && Boolean(formik.errors.link)}
              helperText={formik.touched.link && formik.errors.link}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                <Box sx={{ mt: 2, maxWidth: "300px" }}>
                  <img
                    alt="post"
                    src={`${import.meta.env.VITE_FILE_BASE_URL}${imageFile}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Paper>
  );
}

export default AddChat;
