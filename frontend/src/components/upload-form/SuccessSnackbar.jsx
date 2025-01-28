// SuccessSnackbar.jsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SuccessSnackbar = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
        onClose={onClose}
      >
        Wpis dziennika dodany pomyślnie!
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
