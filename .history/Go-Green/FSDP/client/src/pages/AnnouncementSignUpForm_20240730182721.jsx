import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function AnnouncementSignUpForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    // Logic for proceeding to the next step of the form
    // You can also navigate to a different page if needed
  };

  return (
    <Box
      sx={{ padding: 3, maxWidth: 600, margin: "0 auto", textAlign: "center" }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ textAlign: "left", cursor: "pointer", color: "green", mb: 2 }}
        onClick={handleBackClick}
      >
        &lt;&lt; Back
      </Typography>
      <Typography variant="h4" component="div" sx={{ color: "green", mb: 3 }}>
        Sign Up For Volunteering In Waste Management
      </Typography>
      <Typography variant="body1" component="div" sx={{ mb: 3 }}>
        Thank you for your interest to volunteer with us! Complete the form on
        the "Next &gt;&gt;" page to be updated on our upcoming volunteering
        opportunities via your email!
      </Typography>
      <Typography variant="body1" component="div" sx={{ mb: 3 }}>
        Once you have filled up this form, you will also receive a confirmation
        email shortly after!
      </Typography>
      <Typography variant="body1" component="div" sx={{ mb: 3 }}>
        Please be assured that your application will be treated as strictly
        confidential and used solely for the purpose of your application to be a
        volunteer.
      </Typography>
      <Typography variant="body1" component="div" sx={{ mb: 3 }}>
        Page 1 out of 2
      </Typography>
      <Button variant="contained" color="success" onClick={handleNextClick}>
        Next &gt;&gt;
      </Button>
    </Box>
  );
}

export default AnnouncementSignUpForm;
