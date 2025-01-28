import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import AttachmentsGrid from './AttachmentsGrid';
import MediaSelectionButtons from './MediaSelectionButtons';
import UploadProgressModal from './UploadProgressModal';
import SuccessSnackbar from './SuccessSnackbar';

import { createPost } from '../PostApi';
import { getLocationInfo } from '../../apis/osm';
import placeholder from '../../placeholder.png';

const steps = [
  'Dodaje zdjęcia',
  'Wybierz Lokalizację',
  'Dodaj Opis'
];

const customIcon = L.icon({
  iconUrl: placeholder,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const CreatePostStepper = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    location: '',
    title: 'blank',
    content: '',
    lat: '',
    lng: '',
    contact: '',
  });

  // Stan załączników (zdjęcia)
  const [attachments, setAttachments] = useState([]);

  // Kontrola kroków
  const [activeStep, setActiveStep] = useState(0);

  // Stany przesyłania / sukcesu
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Blokowanie nawigacji (np. podczas odświeżania strony)
  const [blockNavigation, setBlockNavigation] = useState(false);

  // Referencje do mapy, aby jej nie inicjalizować ponownie
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Obsługa prób zamknięcia lub przeładowania zakładki podczas przesyłania
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

  useEffect(() => {
    if (activeStep === 1 && !mapRef.current) {
      mapRef.current = L.map('map').setView([51.505, 19.000], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);

      const onMapClick = async (e) => {
        const { lat, lng } = e.latlng;

        if (markerRef.current) {
          mapRef.current.removeLayer(markerRef.current);
        }

        markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current);

        try {
          const { country, city } = await getLocationInfo(lat, lng);
          const locationString = `${country}, ${city}`;

          setPost((prev) => ({
            ...prev,
            lat,
            lng,
            location: locationString,
          }));
        } catch (error) {
          console.error('Błąd podczas pobierania danych lokalizacji:', error);

          // Alternatywa w przypadku błędu API
          setPost((prev) => ({
            ...prev,
            lat,
            lng,
            location: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
          }));
        }
      };

      mapRef.current.on('click', onMapClick);
    }

    return () => {
      if (activeStep !== 1 && mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [activeStep]);

  const handleAddAttachments = (newFiles) => {
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
      const uploadPromise = createPost(post, attachments);
      // Dla demonstracji, zapewnij minimalny czas, aby można było zobaczyć postęp
      const minTimePromise = new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.all([uploadPromise, minTimePromise]);

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

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Przesyłanie nie powiodło się:', error);
    } finally {
      setIsUploading(false);
      setBlockNavigation(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0: // Krok 1: Załączniki
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Krok 1: Wybierz lub Zrób Zdjęcia
            </Typography>

            <AttachmentsGrid attachments={attachments} onRemoveFile={handleRemoveFile} />

            <MediaSelectionButtons
              isUploading={isUploading}
              onAddFiles={handleAddAttachments}
            />
          </Box>
        );

      case 1: // Krok 2: Lokalizacja
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Krok 2: Wybierz Lokalizację na Mapie
            </Typography>
            <TextField
              fullWidth
              label="Wybrana Lokalizacja"
              value={post.location}
              disabled
              margin="normal"
              helperText="Kliknij na mapie poniżej, aby wybrać miejsce gdzie zrobiono zdjęcie."
            />
            <Box
              id="map"
              sx={{ width: '100%', height: 350, borderRadius: 2, mt: 2 }}
            />
          </Box>
        );

      case 2: // Krok 3: Notatka
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" sx={{ mb: 4 }}>
        <AddPhotoAlternateIcon color="primary" sx={{ fontSize: 60 }} />
        <Typography variant="h2" color="primary" gutterBottom>
          Dodaj Przystanek Podróżnika
        </Typography>
        <Typography variant="h6" color="primary">
          Czyli miejsce, w którym jesteś, lub do którego zabrałeś Podróżnika
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>{getStepContent(activeStep)}</Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled={activeStep === 0 || isUploading}
          onClick={handleBack}
          variant="outlined"
        >
          Cofnij
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained" color="primary">
            Następny
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
      </Box>

      <UploadProgressModal open={isUploading} />
      <SuccessSnackbar open={showSuccess} onClose={handleCloseSuccess} />
    </Container>
  );
};

export default CreatePostStepper;
