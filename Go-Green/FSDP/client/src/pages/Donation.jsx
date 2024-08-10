// src/pages/DonationsPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  Checkbox,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import HeaderWithBackground from '../components/HeaderWithBackground';

const DonationPage = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationFrequency, setDonationFrequency] = useState('One-time');

  const handleAmountChange = (event) => {
    setDonationAmount(event.target.value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (event) => {
    setDonationAmount('');
    setCustomAmount(event.target.value);
  };

  const handleSubmit = () => {
    toast.success('Donation submitted successfully!');
  };

  return (
    <>
      <Box>
        <HeaderWithBackground
          title="Donate"
          backgroundImage="/uploads/test.jpg" // Path to your background image
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 3, gap: 2 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Choose Amount
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                A monthly gift helps us respond to time-critical wishes and plan ahead for children on their wish journeys.
              </FormLabel>
              <RadioGroup
                aria-label="donation-amount"
                name="donation-amount"
                value={donationAmount}
                onChange={handleAmountChange}
                sx={{ mt: 2 }}
              >
                <FormControlLabel value="10" control={<Radio />} label="$10" />
                <FormControlLabel value="25" control={<Radio />} label="$25" />
                <FormControlLabel value="50" control={<Radio />} label="$50" />
                <FormControlLabel value="100" control={<Radio />} label="$100" />
                <FormControlLabel value="250" control={<Radio />} label="$250" />
                <FormControlLabel value="500" control={<Radio />} label="$500" />
              </RadioGroup>
              <TextField
                label="Custom Amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                type="number"
                fullWidth
                sx={{ mt: 2 }}
              />
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Donation Frequency</FormLabel>
                <RadioGroup
                  aria-label="donation-frequency"
                  name="donation-frequency"
                  value={donationFrequency}
                  onChange={(event) => setDonationFrequency(event.target.value)}
                >
                  <FormControlLabel value="One-time" control={<Radio />} label="One-time" />
                  <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                  <FormControlLabel value="Annually" control={<Radio />} label="Annually" />
                </RadioGroup>
              </FormControl>
              <FormControlLabel
                control={<Checkbox name="dedicate" />}
                label="Dedicate my donation in honor or in memory of someone"
                sx={{ mt: 2 }}
              />
              <TextField
                label="What prompted your donation?"
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                sx={{ mt: 2 }}
              >
                <option value="" />
                <option value="event">Event</option>
                <option value="friend">Friend</option>
                <option value="website">Website</option>
              </TextField>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleSubmit}
              >
                Next
              </Button>
            </FormControl>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Make a Donation
            </Typography>
            <Typography variant="body1" gutterBottom>
              Seriously ill children have heard enough bad news for a lifetime. You have the power to give them hope. Your donation helps Make-A-Wish fund life-changing experiences for these children. Watch the video to learn more about the incredible impact your donation can make.
            </Typography>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/example"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Our Wishes
            </Button>
            <Button variant="outlined" color="primary" sx={{ mt: 2, ml: 2 }}>
              Read Jon's Story
            </Button>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
};

export default DonationPage;
