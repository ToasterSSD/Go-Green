import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/UserContext";

function EditExtrauserinfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [extrauserinfo, setExtrauserinfo] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get(`/extrauserinfo/${id}`).then((res) => {
      setExtrauserinfo(res.data);
      setImageFile(res.data.profilePicture);
      setLoading(false);
    });
  }, [id]);

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
    validationSchema: Yup.object().shape({
      displayName: Yup.string().trim().min(3).max(63).required("Display name is required"),
      phoneNumber: Yup.string().trim().max(20).required("Phone number is required"),
      gender: Yup.string().trim().max(10).nullable(),
      age: Yup.number().integer().nullable(),
      dateOfBirth: Yup.date().nullable(),
      socialMedia: Yup.string().trim().max(255).required("Social media link is required"),
      profilePicture: Yup.string().trim().max(255).nullable(),
      bio: Yup.string().trim().max(255).nullable(),
    }),
    onSubmit: (data) => {
      if (imageFile) {
        data.profilePicture = imageFile;
      }

      http
        .put(`/extrauserinfo/${id}`, data)
        .then((res) => {
          toast.success("Extrauserinfo updated successfully.");
          navigate("/Settings");
        })
        .catch((error) => {
          toast.error("Failed to update extrauserinfo.");
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
          formik.setFieldValue("profilePicture", res.data.filename);
        })
        .catch((error) => {
          console.log(error.response);
          toast.error("Failed to upload image.");
        });
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Edit Extrauserinfo
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
              {formik.values.profilePicture && (
                <Box sx={{ mt: 2 }}>
                  <img
                    alt="Profile"
                    src={`${import.meta.env.VITE_FILE_BASE_URL}${formik.values.profilePicture}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" type="submit">
            Update Extrauserinfo
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default EditExtrauserinfo;
