import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Grid, TextField, Button, Avatar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/UserContext";

function Settings() {
  const { user } = useContext(UserContext);
  const [extrauserinfo, setExtrauserinfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (user?.id) {  // Check if the user object and its id are available
      // Fetch the user’s extrauserinfo if it exists
      http.get(`/extrauserinfo/${user.id}`)
        .then((res) => {
          setExtrauserinfo(res.data);
          setImageFile(res.data.profilePicture);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false); // If user.id is not available, stop loading
    }
  }, [user]);

  const formik = useFormik({
    initialValues: extrauserinfo || {
      displayName: "",
      phoneNumber: "",
      gender: "",
      age: "",
      dateOfBirth: "",
      socialMedia: "",
      profilePicture: "",
      bio: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      displayName: Yup.string().trim().min(3).max(63).required("Display name is required"),
      phoneNumber: Yup.string().trim().max(20).required("Phone number is required"),
      gender: Yup.string().trim().max(10).nullable(),
      age: Yup.number().integer().nullable(),
      dateOfBirth: Yup.date().nullable(),
      socialMedia: Yup.string().trim().max(255).required("Social media link is required"),
      bio: Yup.string().trim().max(255).nullable(),
    }),
    onSubmit: (data) => {
      if (imageFile) {
        data.profilePicture = imageFile;
      }

      if (extrauserinfo) {
        // Update existing record
        http.put(`/extrauserinfo/${user.id}`, data)
          .then(() => toast.success("Settings updated successfully."))
          .catch(() => toast.error("Failed to update settings."));
      } else {
        // Create new record
        http.post("/extrauserinfo", data)
          .then(() => toast.success("Settings created successfully."))
          .catch(() => toast.error("Failed to create settings."));
      }
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
      http.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setImageFile(res.data.filename);
        formik.setFieldValue("profilePicture", res.data.filename);
      })
      .catch(() => toast.error("Failed to upload image."));
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return <Typography>User not found.</Typography>; // Handle case where user is not available
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        User Settings
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
          <Avatar
            alt={user.name}
            src={imageFile ? `${import.meta.env.VITE_FILE_BASE_URL}${imageFile}` : ""}
            sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
          />
          <Button variant="contained" component="label">
            Upload Image
            <input hidden accept="image/*" type="file" onChange={onFileChange} />
          </Button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Display Name"
                  name="displayName"
                  value={formik.values.displayName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                  helperText={formik.touched.displayName && formik.errors.displayName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                  helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Social Media"
                  name="socialMedia"
                  value={formik.values.socialMedia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.socialMedia && Boolean(formik.errors.socialMedia)}
                  helperText={formik.touched.socialMedia && formik.errors.socialMedia}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "right" }}>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
}

export default Settings;
