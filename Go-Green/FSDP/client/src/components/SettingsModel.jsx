import React, { useState, useEffect } from "react";
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
  IconButton,
  Grid,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../http"; 
import { useNavigate } from "react-router-dom";

const MaskedField = ({ label, value, isSensitive = false, onReveal, onEdit }) => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(!revealed);
    if (onReveal) onReveal(!revealed);
  };

  const maskEmail = (email) => {
    const [name, domain] = email.split('@');
    const maskedName = name.replace(/./g, '*');
    return `${maskedName}@${domain}`;
  };

  const displayValue = isSensitive && !revealed ? maskEmail(value) : value;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="body1" sx={{ flex: 1 }}>
        <strong>{label}:</strong> {displayValue}
        {isSensitive && (
          <IconButton onClick={handleReveal} sx={{ ml: 1 }}>
            {revealed ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        )}
      </Typography>
      <Button variant="contained" startIcon={<EditIcon />} onClick={onEdit}>
        Edit
      </Button>
    </Box>
  );
};

function SettingsModel({ open, onClose, user, updateUserProfilePicture }) {
  const [tabValue, setTabValue] = useState(0);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.extraInfo?.displayName || user.name || '',
        username: user.name || '',
        email: user.email || '',
        phoneNumber: user.extraInfo?.phoneNumber || '',
        profilePicture: user.extraInfo?.profilePicture || '',
      });
    }
  }, [user, open]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileChange = async (e) => {
    let file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error('Maximum file size is 1MB');
        return;
      }

      let formData = new FormData();
      formData.append('file', file);

      try {
        const res = await http.post('/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const { filename, filePath } = res.data;

        setImageFile(filename);
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: filePath,
        }));

        // Automatically update the user's profilePicture in the database
        await http.put(`/extrauserinfo/${user.id}`, { profilePicture: filePath });
        toast.success('Profile picture updated successfully!');
        updateUserProfilePicture(filePath);
      } catch (error) {
        console.error(error);
        toast.error('Failed to upload the image.');
      }
    }
  };

  const handleSave = () => {
    setEditingField(null);
    onClose(); // Close the modal after saving
  };

  const renderEditField = (label, name) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>{label}:</strong>
      </Typography>
      <TextField
        fullWidth
        margin="dense"
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        variant="outlined"
      />
    </Box>
  );

  const handleImageClick = () => {
    setIsImageDialogOpen(true);
  };

  const handleImageDialogClose = () => {
    setIsImageDialogOpen(false);
  };

  // Check if user is loaded before rendering content
  if (!user) {
    return null; // or return a loading spinner, or some placeholder content
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>User Settings</DialogTitle>
      <DialogContent>
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              onClick={handleImageClick}
              src={formData.profilePicture ? `${import.meta.env.VITE_FILE_BASE_URL}${formData.profilePicture}` : null}
              sx={{ width: 100, height: 100, cursor: 'pointer' }}
            >
              {!formData.profilePicture && <AccountCircleIcon sx={{ width: 100, height: 100 }} />}
            </Avatar>
            <Box sx={{ flexGrow: 1, ml: 2 }}>
              <Typography variant="h5">{formData.displayName}</Typography>
              <Typography variant="body2">{formData.email}</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={onFileChange}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            indicatorColor="primary"
            textColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            <Tab icon={<AccountCircleIcon />} label="Account" />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              {editingField === "displayName" ? (
                renderEditField("Display Name", "displayName")
              ) : (
                <MaskedField
                  label="Display Name"
                  value={formData.displayName}
                  onEdit={() => handleEditClick("displayName")}
                />
              )}
              {editingField === "username" ? (
                renderEditField("Username", "username")
              ) : (
                <MaskedField
                  label="Username"
                  value={formData.username}
                  onEdit={() => handleEditClick("username")}
                />
              )}
              {editingField === "email" ? (
                renderEditField("Email", "email")
              ) : (
                <MaskedField
                  label="Email"
                  value={formData.email}
                  isSensitive={true}
                  onEdit={() => handleEditClick("email")}
                />
              )}
              {editingField === "phoneNumber" ? (
                renderEditField("Phone Number", "phoneNumber")
              ) : (
                <MaskedField
                  label="Phone Number"
                  value={formData.phoneNumber}
                  isSensitive={true}
                  onEdit={() => handleEditClick("phoneNumber")}
                />
              )}
            </Box>
          )}
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>

      {/* Dialog for image magnification */}
      <Dialog open={isImageDialogOpen} onClose={handleImageDialogClose} maxWidth="sm">
        <DialogContent>
          <Avatar
            src={imageFile ? `${import.meta.env.VITE_FILE_BASE_URL}${imageFile}` : null}
            sx={{ width: 300, height: 300, margin: 'auto' }}
          >
            {!imageFile && <AccountCircleIcon sx={{ width: 300, height: 300 }} />}
          </Avatar>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Dialog>
  );
}

export default SettingsModel;
