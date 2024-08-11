import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderWithBackground from '../components/HeaderWithBackground';
import VisaIcon from '@mui/icons-material/CreditCard';
import MasterCardIcon from '@mui/icons-material/CreditCard';
import AmexIcon from '@mui/icons-material/CreditCard';
import DiscoverIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm'; 
import http from '../http';
import UserContext from '../contexts/UserContext';

// Define card type icons
const cardTypeIcons = {
  visa: <VisaIcon style={{ color: '#1a1f71' }} />,
  mastercard: <MasterCardIcon style={{ color: '#eb001b' }} />,
  amex: <AmexIcon style={{ color: '#4e7ab5' }} />,
  discover: <DiscoverIcon style={{ color: '#ff6600' }} />,
  ocbc: <LocalAtmIcon style={{ color: '#ff6600' }} />,
  uob: <LocalAtmIcon style={{ color: '#0070c0' }} />,
  posb: <LocalAtmIcon style={{ color: '#004b87' }} />,
  paynow: <LocalAtmIcon style={{ color: '#7e3794' }} />,
  paylah: <LocalAtmIcon style={{ color: '#d81e5b' }} />,
};

// Detect card type based on the number
const detectCardType = (number) => {
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const masterCardRegex = /^5[1-5][0-9]{14}$/;
  const amexRegex = /^3[47][0-9]{13}$/;
  const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
  const ocbcRegex = /^6[2-4][0-9]{14}$/;
  const uobRegex = /^7[0-9]{14}$/;
  const posbRegex = /^8[0-9]{14}$/;
  const paynowRegex = /^9[0-9]{14}$/;
  const paylahRegex = /^0[1-9][0-9]{14}$/;

  if (visaRegex.test(number)) return 'visa';
  if (masterCardRegex.test(number)) return 'mastercard';
  if (amexRegex.test(number)) return 'amex';
  if (discoverRegex.test(number)) return 'discover';
  if (ocbcRegex.test(number)) return 'ocbc';
  if (uobRegex.test(number)) return 'uob';
  if (posbRegex.test(number)) return 'posb';
  if (paynowRegex.test(number)) return 'paynow';
  if (paylahRegex.test(number)) return 'paylah';

  return null;
};

const DonationPage = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationFrequency, setDonationFrequency] = useState('One-time');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    ccv: '',
  });
  const [cardType, setCardType] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const isPaymentValid =
      paymentInfo.cardNumber.length >= 13 &&
      paymentInfo.cardNumber.length <= 20 &&
      paymentInfo.expirationDate.length === 5 && // Ensure MM/YY format
      paymentInfo.ccv.length === 3;

    setIsSubmitDisabled(!isPaymentValid);
  }, [paymentInfo]);

  const handleAmountChange = (event) => {
    setDonationAmount(event.target.value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (event) => {
    setDonationAmount('');
    setCustomAmount(event.target.value);
  };

  const handleOpenPaymentDialog = () => {
    if (donationAmount || customAmount) {
      setIsPaymentDialogOpen(true);
    } else {
      toast.error('Please select or enter a donation amount.');
    }
  };

  const handleClosePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
  };

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;

    if (name === 'cardNumber') {
      const cleanedValue = value.replace(/\D/g, ''); // Remove non-digit characters
      const detectedType = detectCardType(cleanedValue);
      setCardType(detectedType);
      setPaymentInfo({ ...paymentInfo, [name]: cleanedValue });
    } else if (name === 'expirationDate') {
      let formattedValue = value.replace(/[^0-9]/g, ''); // Only allow digits

      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }

      setPaymentInfo({ ...paymentInfo, [name]: formattedValue });
    } else {
      setPaymentInfo({ ...paymentInfo, [name]: value });
    }
  };

  const handlePaymentSubmit = () => {
    if (!paymentInfo.cardNumber || !paymentInfo.expirationDate || !paymentInfo.ccv) {
      toast.error('Please fill out all payment fields.');
      return;
    }

    setIsPaymentDialogOpen(false);
    toast.success(`Thank you for your ${donationFrequency} donation of $${donationAmount || customAmount}!`);
    setTimeout(() => {
      window.location.href = `/thank-you?amount=${donationAmount || customAmount}&frequency=${donationFrequency}`;
    }, 2000);
  };

  return (
    <>
      <Box>
        <HeaderWithBackground
          title="Donate"
          backgroundImage="/uploads/test.jpg"
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
                inputProps={{ min: 0 }} // Prevent negative values
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
                onClick={handleOpenPaymentDialog}
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
      <Dialog open={isPaymentDialogOpen} onClose={handleClosePaymentDialog}>
        <DialogTitle>Enter Payment Information</DialogTitle>
        <DialogContent>
          <TextField
            label="Card Number"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
            fullWidth
            sx={{ mt: 2 }}
            inputMode="numeric" // Only allow numeric input
            pattern="\d*" // Ensure only numbers can be input
            inputProps={{
              maxLength: 20, // Limit card number to 20 digits
              inputMode: 'numeric', // Ensure only numeric input
            }}
            InputProps={{
              startAdornment: cardType && (
                <InputAdornment position="start">
                  {cardTypeIcons[cardType]}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Expiration Date"
            name="expirationDate"
            value={paymentInfo.expirationDate}
            onChange={handlePaymentChange}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="MM/YY"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              maxLength: 5, // Limit to 5 characters (MM/YY)
              pattern: '(0[1-9]|1[0-2])/[0-9]{2}', // Regex pattern for MM/YY format
              inputMode: 'numeric', // Only allow numeric input
            }}
          />
          <TextField
            label="CCV"
            name="ccv"
            value={paymentInfo.ccv}
            onChange={handlePaymentChange}
            fullWidth
            sx={{ mt: 2 }}
            inputProps={{
              maxLength: 3, // Limit CCV to 3 digits
              inputMode: 'numeric', // Ensure only numeric input
              pattern: '\\d*', // Ensure only numbers can be input
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handlePaymentSubmit}
            color="primary"
            disabled={isSubmitDisabled} // Disable the submit button if fields are not valid
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default DonationPage;
