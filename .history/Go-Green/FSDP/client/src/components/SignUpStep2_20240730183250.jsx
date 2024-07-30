import React from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  salutation: yup.string().required("Salutation is required"),
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  emergencyContactName: yup
    .string()
    .required("Emergency Contact Name is required"),
  emergencyContactNumber: yup
    .string()
    .required("Emergency Contact No. is required"),
});

function SignUpStep2() {
  const formik = useFormik({
    initialValues: {
      salutation: "",
      fullName: "",
      email: "",
      phone: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    },
  });

  return (
    <Box sx={{ p: 4 }}>
      <Button component={Link} to="/announcement-signup-step1">
        &lt;&lt; Back
      </Button>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Sign Up For Volunteering In Waste Management
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Personal Particulars
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          select
          label="Salutation"
          name="salutation"
          value={formik.values.salutation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.salutation && Boolean(formik.errors.salutation)}
          helperText={formik.touched.salutation && formik.errors.salutation}
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="Mr">Mr</MenuItem>
          <MenuItem value="Mrs">Mrs</MenuItem>
          <MenuItem value="Miss">Miss</MenuItem>
          <MenuItem value="Dr">Dr</MenuItem>
        </TextField>
        <TextField
          label="Full Name"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Emergency Contact Name"
          name="emergencyContactName"
          value={formik.values.emergencyContactName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.emergencyContactName &&
            Boolean(formik.errors.emergencyContactName)
          }
          helperText={
            formik.touched.emergencyContactName &&
            formik.errors.emergencyContactName
          }
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Emergency Contact No."
          name="emergencyContactNumber"
          type="tel"
          value={formik.values.emergencyContactNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.emergencyContactNumber &&
            Boolean(formik.errors.emergencyContactNumber)
          }
          helperText={
            formik.touched.emergencyContactNumber &&
            formik.errors.emergencyContactNumber
          }
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Typography variant="h6" align="center" sx={{ mb: 4 }}>
          Page 2 out of 2
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Button type="submit" variant="contained" color="success">
            Submit Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpStep2;
