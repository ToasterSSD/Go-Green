import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import http from '../http';

// Updated AccountTab Component with Profile Picture Handling and Extra User Info
const AccountTab = ({ user, extraUserInfo, onInputChange, onFileChange, previewImage }) => {
  const [isEmailRevealed, setIsEmailRevealed] = useState(false); // Show email initially
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);

  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    const maskedName = "*".repeat(name.length); // Mask all characters before @
    return `${maskedName}@${domain}`;
  };

  const maskPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    return phoneNumber.slice(-4).padStart(phoneNumber.length, "*");
  };

  const handleEditProfilePicture = () => {
    setIsEditingProfilePicture(!isEditingProfilePicture);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Profile Image and Display Name Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ position: 'relative', width: 80, height: 80 }}>
          <img
            src={previewImage || (extraUserInfo?.profilePicture 
              ? `${import.meta.env.VITE_FILE_BASE_URL}/${extraUserInfo.profilePicture}` 
              : 'https://via.placeholder.com/80')}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px solid #000',
              objectFit: 'cover', // Ensures the image is contained within the circle
            }}
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {extraUserInfo?.displayName || 'Display Name'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user?.name || 'Actual Name'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user?.username || 'Username'}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          sx={{ ml: 'auto' }}
          startIcon={<EditIcon />}
          onClick={handleEditProfilePicture}
        >
          {isEditingProfilePicture ? 'Cancel' : 'Edit User Profile'}
        </Button>
      </Box>

      <Divider />

      {/* Conditional Profile Picture Upload */}
      {isEditingProfilePicture && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="dense"
            label="Profile Picture URL"
            name="profilePicture"
            value={extraUserInfo?.profilePicture?.name || extraUserInfo?.profilePicture || ''}
            variant="outlined"
            onChange={onInputChange}
            InputProps={{
              startAdornment: extraUserInfo?.profilePicture && (
                <img src={previewImage || `${import.meta.env.VITE_FILE_BASE_URL}/${extraUserInfo.profilePicture}`} alt="Profile" style={{ width: 50, height: 50, marginRight: 10 }} />
              )
            }}
          />
          <input
            type="file"
            name="profilePicture"
            onChange={onFileChange}
            accept="image/*" // Accept any image file type
            style={{ marginTop: '16px', marginBottom: '16px' }}
          />
        </Box>
      )}

      <Divider />

      {/* User Information Fields */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="overline">EMAIL</Typography>
          <TextField
            fullWidth
            margin="dense"
            name="email"
            value={isEmailRevealed ? user?.email : maskEmail(user?.email)}
            variant="outlined"
            onChange={onInputChange}
            disabled={!isEmailRevealed} // Disable input when masked
          />
        </Box>
        <IconButton onClick={() => setIsEmailRevealed(!isEmailRevealed)}>
          <VisibilityIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="overline">PHONE NUMBER</Typography>
          <TextField
            fullWidth
            margin="dense"
            name="phoneNumber"
            value={isPhoneRevealed ? extraUserInfo?.phoneNumber : maskPhoneNumber(extraUserInfo?.phoneNumber)}
            variant="outlined"
            onChange={onInputChange}
            disabled={!isPhoneRevealed} // Disable input when masked
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Ensure only numbers are input
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setIsPhoneRevealed(!isPhoneRevealed)}>
            <VisibilityIcon />
          </IconButton>
          <Button
            variant="text"
            color="error"
            startIcon={<RemoveCircleIcon />}
            sx={{ textTransform: 'none' }}
          >
            Remove
          </Button>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider />
      <TextField
        fullWidth
        margin="dense"
        label="Gender"
        name="gender"
        value={extraUserInfo?.gender || ''}
        variant="outlined"
        onChange={onInputChange}
        sx={{ mt: 2 }}
      />
      <Divider />
      <TextField
        fullWidth
        margin="dense"
        label="Age"
        name="age"
        value={extraUserInfo?.age || ''}
        variant="outlined"
        onChange={onInputChange}
        sx={{ mt: 2 }}
      />
      <Divider />
      <TextField
        fullWidth
        margin="dense"
        label="Date of Birth"
        name="dateOfBirth"
        value={extraUserInfo?.dateOfBirth || ''}
        variant="outlined"
        onChange={onInputChange}
        sx={{ mt: 2 }}
      />
      <Divider />
      <TextField
        fullWidth
        margin="dense"
        label="Social Media"
        name="socialMedia"
        value={extraUserInfo?.socialMedia || ''}
        variant="outlined"
        onChange={onInputChange}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

// SettingsModel Component
function SettingsModel({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    ...user,
    profilePicture: null, // For file upload
  });
  const [extraUserInfo, setExtraUserInfo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtraUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; // Return if no file is selected

    setExtraUserInfo((prevData) => ({
      ...prevData,
      profilePicture: file, // Store the selected file
    }));

    // Generate a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(extraUserInfo).forEach((key) => {
        data.append(key, extraUserInfo[key]);
      });

      // Assuming user ID is available in user object
      await http.put(`/api/extrauserinfo/${user.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onClose(); // Close the dialog on successful update
      // Optionally, you might want to reload or update the page to reflect changes in the navbar
    } catch (error) {
      console.error("Failed to update user information", error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await http.get('/api/user/me');
        const extraUserInfoResponse = await http.get(`/api/extrauserinfo/${userResponse.data.id}`);
        
        setFormData(userResponse.data);
        setExtraUserInfo(extraUserInfoResponse.data);
      } catch (error) {
        console.error("Failed to fetch user information", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" sx={{ zIndex: 1300 }}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Card sx={{ display: 'flex', minHeight: 300, p: 2 }}>
          <Box sx={{ width: '100%', padding: 2 }}>
            <AccountTab 
              user={formData} 
              extraUserInfo={extraUserInfo}
              onInputChange={handleInputChange} 
              onFileChange={handleFileChange} 
              previewImage={previewImage}
            />
          </Box>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsModel;
