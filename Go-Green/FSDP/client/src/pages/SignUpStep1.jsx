import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

function SignUpStep1() {
  const { id } = useParams();

  return (
    <Box sx={{ p: 4 }}>
      <Button component={Link} to="/announcement">
        &lt;&lt; Back
      </Button>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Sign Up For Volunteering In Waste Management
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Thank you for your interest to volunteer with us! Complete the form on
        the "Next &gt;&gt;" page to be updated on our upcoming volunteering
        opportunities via your email! Once you have filled up this form, you
        will also receive a confirmation email shortly after!
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 4 }}>
        Please be assured that your application will be treated as strictly
        confidential and used solely for the purpose of your application to be a
        volunteer.
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 4 }}>
        Page 1 out of 2
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Button
          component={Link}
          to={`/announcement-signup-step2/${id}`}
          variant="contained"
          color="success"
        >
          Next &gt;&gt;
        </Button>
      </Box>
    </Box>
  );
}

export default SignUpStep1;
