import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/UserContext";
import { Editor } from "@tinymce/tinymce-react";

function AddAnnouncement() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [imageFile, setImageFile] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!user?.roles.includes("ADMIN")) {
      setShowToast(true);
      setTimeout(() => {
        navigate("/announcement");
      }, 2000);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (showToast) {
      toast.error("You do not have permission to add an announcement.");
    }
  }, [showToast]);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      link: "",
      showSignUp: false, // Add this field
      eventName: "",
      eventDate: "",
      eventTime: "",
      eventLocation: "",
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
      eventName: yup.string().when("showSignUp", {
        is: true,
        then: yup.string().required("Event Name is required"),
      }),
      eventDate: yup.string().when("showSignUp", {
        is: true,
        then: yup.string().required("Event Date is required"),
      }),
      eventTime: yup.string().when("showSignUp", {
        is: true,
        then: yup.string().required("Event Time is required"),
      }),
      eventLocation: yup.string().when("showSignUp", {
        is: true,
        then: yup.string().required("Event Location is required"),
      }),
    }),
    onSubmit: (data) => {
      if (imageFile) {
        data.imageFile = imageFile;
      }

      // Make sure to include the signUpButton in the form data
      data.signUpButton = formik.values.showSignUp; // Add this line

      data.title = data.title.trim();
      data.content = data.content.trim();

      if (data.content.length > 5000) {
        toast.error("Content must be at most 5000 characters.");
        return;
      }

      console.log("Form data being sent:", data);
      http
        .post("/announcement", data)
        .then((res) => {
          console.log(res.data);
          navigate("/announcement");
        })
        .catch((error) => {
          toast.error("Failed to add announcement.");
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
          console.log(error.response);
          toast.error("Failed to upload image.");
        });
    }
  };

  if (!user?.roles.includes("ADMIN")) {
    return <ToastContainer />;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Add Announcement
      </Typography>
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
              apiKey="cs4qd53jal9cfhagqejsavnjreib4rxp8fjetmervpkma4b5"
              value={formik.values.content}
              init={{
                height: 500,
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
            <FormControlLabel
              control={
                <Checkbox
                  name="showSignUp"
                  color="primary"
                  checked={formik.values.showSignUp}
                  onChange={formik.handleChange}
                />
              }
              label="Display Sign Up Button"
              sx={{ mt: 2 }}
            />
            {formik.values.showSignUp && (
              <>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Event Name"
                  name="eventName"
                  value={formik.values.eventName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.eventName && Boolean(formik.errors.eventName)
                  }
                  helperText={
                    formik.touched.eventName && formik.errors.eventName
                  }
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  value={formik.values.eventDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.eventDate && Boolean(formik.errors.eventDate)
                  }
                  helperText={
                    formik.touched.eventDate && formik.errors.eventDate
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Event Time"
                  name="eventTime"
                  type="time"
                  value={formik.values.eventTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.eventTime && Boolean(formik.errors.eventTime)
                  }
                  helperText={
                    formik.touched.eventTime && formik.errors.eventTime
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Event Location"
                  name="eventLocation"
                  value={formik.values.eventLocation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.eventLocation &&
                    Boolean(formik.errors.eventLocation)
                  }
                  helperText={
                    formik.touched.eventLocation && formik.errors.eventLocation
                  }
                />
              </>
            )}
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
                    style={{ width: "100%", height: "auto" }}
                  />
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

export default AddAnnouncement;
