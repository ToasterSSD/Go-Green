
import React from "react";
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

function SettingsModel({ open, onClose, user }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Box component="form">
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={user?.name}
            // You can add more fields and handle change events
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            value={user?.email}
            // You can add more fields and handle change events
          />
          {/* Add more fields as needed */}
        </Box>
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
