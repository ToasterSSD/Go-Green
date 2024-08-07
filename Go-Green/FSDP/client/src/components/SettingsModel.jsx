import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Card, 
  Tabs, 
  Tab, 
  Divider 
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';

const AccountTab = ({ user }) => (
  <Box component="form" sx={{ mt: 2 }}>
    <TextField
      fullWidth
      margin="dense"
      label="Name"
      name="name"
      value={user?.name || ''}
      variant="outlined"
      sx={{ mb: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    <TextField
      fullWidth
      margin="dense"
      label="Email"
      name="email"
      value={user?.email || ''}
      variant="outlined"
      sx={{ mb: 2, mt: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    <TextField
      fullWidth
      margin="dense"
      label="Display Name"
      name="displayName"
      value={user?.extraInfo?.displayName || ''}
      variant="outlined"
      sx={{ mb: 2, mt: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    <TextField
      fullWidth
      margin="dense"
      label="Phone Number"
      name="phoneNumber"
      value={user?.extraInfo?.phoneNumber || ''}
      variant="outlined"
      sx={{ mb: 2, mt: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    <TextField
      fullWidth
      margin="dense"
      label="Gender"
      name="gender"
      value={user?.extraInfo?.gender || ''}
      variant="outlined"
      sx={{ mb: 2, mt: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    <TextField
      fullWidth
      margin="dense"
      label="Home Address"
      name="homeAddress"
      value={user?.extraInfo?.homeAddress || ''}
      variant="outlined"
      sx={{ mb: 2, mt: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    <TextField
      fullWidth
      margin="dense"
      label="Payment Information"
      name="paymentInformation"
      value={user?.extraInfo?.paymentInformation || ''}
      variant="outlined"
      sx={{ mb: 2, mt: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    <TextField
      fullWidth
      margin="dense"
      label="Age"
      name="age"
      value={user?.extraInfo?.age || ''}
      variant="outlined"
      sx={{ mb: 2, mt: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    <TextField
      fullWidth
      margin="dense"
      label="Date of Birth"
      name="dateOfBirth"
      value={user?.extraInfo?.dateOfBirth || ''}
      variant="outlined"
      sx={{ mb: 2, mt: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    <TextField
      fullWidth
      margin="dense"
      label="Social Media"
      name="socialMedia"
      value={user?.extraInfo?.socialMedia || ''}
      variant="outlined"
      sx={{ mb: 2, mt: 2 }}
      // onChange event handler for updating user information
    />
  </Box>
);

const ProfileTab = ({ user }) => (
  <Box component="form" sx={{ mt: 2 }}>
    <TextField
      fullWidth
      margin="dense"
      label="Profile Picture URL"
      name="profilePicture"
      value={user?.extraInfo?.profilePicture || ''}
      variant="outlined"
      sx={{ mb: 2 }}
      // onChange event handler for updating user information
    />
    <Divider />
    {/* Add more profile-related fields if needed */}
  </Box>
);

function SettingsModel({ open, onClose, user }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Card sx={{ display: 'flex', minHeight: 300, p: 2 }}>
          <Box sx={{ width: '25%', borderRight: 1, borderColor: 'divider' }}>
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Settings Tabs"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab 
                icon={<AccountCircleIcon />} 
                label={<Typography variant="h6">Account</Typography>} 
                sx={{ flexDirection: 'row' }} 
              />
              <Divider />
              <Tab 
                icon={<PersonIcon />} 
                label={<Typography variant="h6">Profile</Typography>} 
                sx={{ flexDirection: 'row' }} 
              />
              <Divider />
              {/* Add more tabs as needed */}
            </Tabs>
          </Box>
          <Box sx={{ width: '75%', padding: 2 }}>
            {tabValue === 0 && <AccountTab user={user} />}
            {tabValue === 1 && <ProfileTab user={user} />}
            {/* Add more tab panels as needed */}
          </Box>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={onClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsModel;
