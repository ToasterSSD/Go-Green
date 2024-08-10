import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/UserContext";

function AddExtrauserinfo() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [imageFile, setImageFile] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!user?.roles.includes("ADMIN")) {
      setShowToast(true);
      setTimeout(() => {
        navigate("/extrauserinfo");
      }, 2000);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (showToast) {
      toast.error("You do not have permission to add an extrauserinfo.");
    }
  }, [showToast]);

  const formik = useFormik({
    initialValues: {
      displayName: '',
      phoneNumber: '',
      gender: '',
      age: '',
      dateOfBirth: '',
      socialMedia: '',
      profilePicture: '',
      bio: '',
    },
    validationSchema: Yup.object().shape({
      displayName: Yup.string().trim().min(3).max(63).required('Display name is required'),
      phoneNumber: Yup.string().trim().max(20).required('Phone number is required'),
      gender: Yup.string().trim().max(10).nullable(),
      age: Yup.number().integer().nullable(),
      dateOfBirth: Yup.date().nullable(),
      socialMedia: Yup.string().trim().max(255).required('Social media link is required'),
      profilePicture: Yup.string().trim().max(255).nullable(),
      bio: Yup.string().trim().max(255).nullable(),
    }),
    onSubmit: (data) => {
      if (imageFile) {
        data.profilePicture = imageFile;
      }

      http
        .post("/extrauserinfo", data)
        .then((res) => {
          toast.success("Extrauserinfo added successfully.");
          navigate("/Settings");  // Redirect to /Settings after successful addition
        })
        .catch((error) => {
          toast.error("Failed to add extrauserinfo.");
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
        Add Extrauserinfo
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              margin="dense"
              label="Display Name"
              name="displayName"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.displayName && Boolean(formik.errors.displayName)}
              helperText={formik.touched.displayName && formik.errors.displayName}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Age"
              name="age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
              helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Social Media"
              name="socialMedia"
              value={formik.values.socialMedia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.socialMedia && Boolean(formik.errors.socialMedia)}
              helperText={formik.touched.socialMedia && formik.errors.socialMedia}
            />
            <TextField
              fullWidth
              margin="dense"
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
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button variant="contained" component="label">
                Upload Profile Picture
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={onFileChange}
                />
              </Button>
              {imageFile && (
                <Box sx={{ mt: 2 }}>
                  <img
                    alt="Profile"
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
            Add Extrauserinfo
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default AddExtrauserinfo;
