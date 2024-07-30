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
import { Editor } from "@tinymce/tinymce-react";

function EditAnnouncement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [announcement, setAnnouncement] = useState({
    title: "",
    content: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get(`/announcement/${id}`).then((res) => {
      setAnnouncement(res.data);
      setImageFile(res.data.imageFile);
      setLoading(false);
    });
  }, [id]);

  const formik = useFormik({
    initialValues: announcement,
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be at most 100 characters")
        .required("Title is required"),
      content: yup
        .string()
        .trim()
        .min(3, "Content must be at least 3 characters")
        .max(2000, "Content must be at most 2000 characters")
        .required("Content is required"),
      link: yup.string().url("Must be a valid URL"),
    }),
    onSubmit: (data) => {
      if (imageFile) {
        data.imageFile = imageFile;
      }
      data.title = data.title.trim();
      data.content = data.content.trim();
      data.link = data.link.trim();
      http
        .put(`/announcement/${id}`, data)
        .then((res) => {
          toast.success("Announcement updated successfully.");
          navigate("/announcement");
        })
        .catch((error) => {
          toast.error("Failed to update announcement.");
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

  const deleteAnnouncement = () => {
    http
      .delete(`/announcement/${id}`)
      .then((res) => {
        toast.success("Announcement deleted successfully.");
        navigate("/announcement");
      })
      .catch((error) => {
        toast.error("Failed to delete announcement.");
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
        Edit Announcement
      </Typography>
      {!loading && (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={8}>
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
              <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                Content
              </Typography>
              <Editor
                apiKey="kehqc691ze20c4gfvdx0ygcfxqj44cnvihun8288yuumakuy"
                value={formik.values.content}
                init={{
                  height: 2000,
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
              <TextField
                fullWidth
                id="link"
                name="link"
                label="Link"
                value={formik.values.link}
                onChange={formik.handleChange}
                error={formik.touched.link && Boolean(formik.errors.link)}
                helperText={formik.touched.link && formik.errors.link}
                sx={{ mt:2, mb: 2 }}
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
                      alt="announcement"
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
            {user?.roles.includes("ADMIN") ||
            user?.id === announcement.userId ? (
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                color="error"
                onClick={handleOpen}
              >
                Delete
              </Button>
            ) : null}
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Announcement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this announcement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={deleteAnnouncement}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
}

export default EditAnnouncement;
