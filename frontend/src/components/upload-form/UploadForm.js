// src/components/CreatePostStepper.js

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import AttachmentsGrid from './AttachmentsGrid';
import MediaPicker from './MediaPicker';
import UploadProgressModal from './UploadProgressModal';
import SuccessSnackbar from './SuccessSnackbar';
import MapPicker from './MapPicker'; // Import the new MapPicker component

import { createPost } from '../../apis/PostApi';

import {
  HorizontalButtonGroup,
  OuterSectionContainer,
  OuterSectionIcon,
} from '../styled-components';

const steps = [
  'Dodaj zdjęcia',
  'Wybierz Lokalizację',
  'Dodaj Opis'
];

const UploadForm = () => {
  const [post, setPost] = useState({
    location: '',
    title: 'blank',
    content: '',
    lat: '',
    lng: '',
    contact: '',
  });

  // State for attachments (photos)
  const [attachments, setAttachments] = useState([]);

  // Control steps
  const [activeStep, setActiveStep] = useState(0);

  // Uploading / success states
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Navigation blocking state (e.g., during upload)
  const [blockNavigation, setBlockNavigation] = useState(false);

  // Handle before unload to block navigation if necessary
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (blockNavigation) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [blockNavigation]);

  const handleAddAttachments = (newFiles) => {
    console.info('Adding files:', newFiles);
    setAttachments((prev) => [...prev, ...newFiles]);
  };
  const handleRemoveFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    setBlockNavigation(true);

    try {
      await createPost(post, attachments);
      window.location.reload();
      setPost({
        location: '',
        content: '',
        lat: '',
        lng: '',
        name: '',
        contact: '',
      });
      setAttachments([]);
      setShowSuccess(true);

      // setTimeout(() => {
      //   navigate('/');
      // }, 2000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      setBlockNavigation(false);
    }
  };

  const handleLocationSelect = useCallback(({ lat, lng, location }) => {
    setPost((prev) => ({
      ...prev,
      lat,
      lng,
      location,
    }));
  }, []);

  const getStepContent = (step) => {
    switch (step) {
      case 0: // Step 1: Attachments
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Krok 1: Dodaj Zdjęcia Przystanku
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Nie więcej niż 5 zdjęć, które najlepiej opisują to miejsce, Ciebie i Podróżnika.
            </Typography>
            <AttachmentsGrid attachments={attachments} onRemoveFile={handleRemoveFile} />
            <MediaPicker
              onAddFiles={handleAddAttachments}
            />
          </Box>
        );

      case 1: // Step 2: Location
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Krok 2: Wybierz Lokalizację na Mapie
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Użyj mapy, aby w przybliżeniu wskazać miejsce, w którym zrobiłeś zdjęcia.
            </Typography>
            <TextField
              fullWidth
              label="Wybrana Lokalizacja"
              value={post.location}
              disabled
              margin="normal"
            />
            <MapPicker
              onLocationSelect={handleLocationSelect}
              initialPosition={[post.lan || 51.505, post.lng || 19.000]} />
          </Box>
        );

      case 2: // Step 3: Description
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Krok 3: Dodaj Notatkę
            </Typography>
            <TextField
              fullWidth
              label="Napisz coś o tym przystanku..."
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email / Telegram / Telefon (opcjonalnie)"
              value={post.contact || ''}
              onChange={(e) => setPost({ ...post, contact: e.target.value })}
              margin="normal"
            />
            <Typography variant="caption" color="textSecondary">
              Twóje dane nie są wymagane, ale w razie zgubienia Podróżnika mogą pomóc w jego odnalezieniu.
            </Typography>
          </Box>
        );

      default:
        return 'Nieznany krok';
    }
  };

  return (
    <OuterSectionContainer>
        <OuterSectionIcon>
          <AddPhotoAlternateIcon/>
        </OuterSectionIcon>
        <Typography variant="h2" color="primary" gutterBottom>
          Dodaj Przystanek
        </Typography>
        <Typography variant="h6" color="primary">
          W domu, w lesie czy na szczycie góry? Pokaż miejsce do którego zabrałeś Podróżnika
        </Typography>

      <Stepper sx={{mt: 2}} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {getStepContent(activeStep)}
      </Box>

      <HorizontalButtonGroup>
        <Button disabled={activeStep === 0} onClick={handleBack}mvariant="outlined">
          Cofnij
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained" color="primary">
            Następny krok
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            disabled={isUploading}
          >
            {isUploading ? 'Przesyłanie...' : 'Prześlij'}
          </Button>
        )}
      </HorizontalButtonGroup>

      <UploadProgressModal open={isUploading} />
      <SuccessSnackbar open={showSuccess} onClose={handleCloseSuccess} />
    </OuterSectionContainer>
  );
};

export default UploadForm;
