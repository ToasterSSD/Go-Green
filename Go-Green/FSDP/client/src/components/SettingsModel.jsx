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
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SaveIcon from "@mui/icons-material/Save";
import http from "../http";

const AccountTab = ({
  user,
  extraUserInfo,
  onInputChange,
  onFileChange,
  previewImage,
  isEmailRevealed,
  toggleEmailReveal,
  handleEditProfilePicture,
  isEditingProfilePicture,
  isEditingEmail,
  handleEditEmail,
  profilePictureFileName,
}) => {
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);

  const maskPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    return phoneNumber.slice(-4).padStart(phoneNumber.length, "*");
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    return `${"*".repeat(localPart.length)}@${domain}`;
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box sx={{ position: "relative", width: 80, height: 80 }}>
          <img
            src={
              previewImage ||
              (extraUserInfo?.profilePicture
                ? `${import.meta.env.VITE_FILE_BASE_URL}/${extraUserInfo.profilePicture}`
                : "https://via.placeholder.com/80")
            }
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid #000",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {extraUserInfo?.displayName || "Display Name"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user?.name || "Actual Name"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user?.username || "Username"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          startIcon={<EditIcon />}
          onClick={handleEditProfilePicture}
        >
          {isEditingProfilePicture ? "Cancel" : "Edit User Profile"}
        </Button>
      </Box>

      <Divider />

      {isEditingProfilePicture && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="dense"
            label="Profile Picture"
            name="profilePicture"
            value={
              extraUserInfo?.profilePicture ||
              (extraUserInfo?.profilePicture
                ? `${import.meta.env.VITE_FILE_BASE_URL}/${extraUserInfo.profilePicture}`
                : "")
            }
            variant="outlined"
            onChange={onInputChange}
            InputProps={{
              startAdornment: previewImage && (
                <img
                  src={
                    previewImage ||
                    `${import.meta.env.VITE_FILE_BASE_URL}/${extraUserInfo.profilePicture}`
                  }
                  alt="Profile"
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
              ),
            }}
          />
          <input
            type="file"
            name="profilePicture"
            onChange={onFileChange}
            accept="image/*"
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />
        </Box>
      )}

      <Divider />

      <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="overline">EMAIL</Typography>
          <TextField
            fullWidth
            margin="dense"
            name="email"
            value={isEmailRevealed ? user?.email || "" : maskEmail(user?.email)}
            variant="outlined"
            onChange={onInputChange}
            disabled={!isEditingEmail}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={toggleEmailReveal}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={handleEditEmail}>
            {isEditingEmail ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="overline">PHONE NUMBER</Typography>
          <TextField
            fullWidth
            margin="dense"
            name="phoneNumber"
            value={
              isPhoneRevealed
                ? extraUserInfo?.phoneNumber
                : maskPhoneNumber(extraUserInfo?.phoneNumber)
            }
            variant="outlined"
            onChange={onInputChange}
            disabled={!isPhoneRevealed}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => setIsPhoneRevealed(!isPhoneRevealed)}>
            <VisibilityIcon />
          </IconButton>
          <Button
            variant="text"
            color="error"
            startIcon={<RemoveCircleIcon />}
            sx={{ textTransform: "none" }}
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
        value={extraUserInfo?.gender || ""}
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
        value={extraUserInfo?.age || ""}
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
        value={extraUserInfo?.dateOfBirth || ""}
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
        value={extraUserInfo?.socialMedia || ""}
        variant="outlined"
        onChange={onInputChange}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

function SettingsModel({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    ...user,
    profilePicture: null,
  });
  const [extraUserInfo, setExtraUserInfo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [profilePictureFileName, setProfilePictureFileName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setFormData((prevData) => ({
        ...prevData,
        email: value,
      }));
    } else {
      setExtraUserInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExtraUserInfo((prevData) => ({
      ...prevData,
      profilePicture: file.name,
    }));

    setProfilePictureFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEditProfilePicture = () => {
    setIsEditingProfilePicture(!isEditingProfilePicture);
  };

  const toggleEmailReveal = () => {
    setIsEmailRevealed(!isEmailRevealed);
  };

  const handleEditEmail = async () => {
    if (isEditingEmail) {
      try {
        const response = await http.put("/user/update-email", {
          email: formData.email,
        });

        setSnackbarMessage(response.data.message || "Email updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        onClose();
      } catch (error) {
        console.error("Failed to update email", error);
        setSnackbarMessage(error.response.data.message || "Failed to update email.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }

    setIsEditingEmail(!isEditingEmail);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      // Ensure extraUserInfo is not null or undefined
      if (extraUserInfo) {
        Object.keys(extraUserInfo).forEach((key) => {
          data.append(key, extraUserInfo[key]);
        });
      }

      if (isEmailRevealed && formData.email !== user.email) {
        data.append("email", formData.email);
      }

      await http.put(`/extrauserinfo/${user.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSnackbarMessage("User information updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      onClose();
    } catch (error) {
      console.error("Failed to update user information", error);
      setSnackbarMessage("Failed to update user information");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await http.get("/userview/me");
        const extraUserInfoResponse = await http.get(
          `/extrauserinfo/${userResponse.data.id}`
        );

        setFormData(userResponse.data);
        setExtraUserInfo(extraUserInfoResponse.data);
      } catch (error) {
        console.error("Failed to fetch user information", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{ zIndex: 1300 }}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Card sx={{ display: "flex", minHeight: 300, p: 2 }}>
          <Box sx={{ width: "100%", padding: 2 }}>
            <AccountTab
              user={formData}
              extraUserInfo={extraUserInfo}
              onInputChange={handleInputChange}
              onFileChange={handleFileChange}
              previewImage={previewImage}
              isEmailRevealed={isEmailRevealed}
              toggleEmailReveal={toggleEmailReveal}
              handleEditProfilePicture={handleEditProfilePicture}
              isEditingProfilePicture={isEditingProfilePicture}
              isEditingEmail={isEditingEmail}
              handleEditEmail={handleEditEmail}
              profilePictureFileName={profilePictureFileName}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default SettingsModel;
