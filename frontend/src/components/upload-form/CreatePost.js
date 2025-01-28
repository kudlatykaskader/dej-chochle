import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { createPost } from "../PostApi";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Our extracted components
import AttachmentsGrid from "./AttachmentsGrid";
import MediaSelectionButtons from "./MediaSelectionButtons";
import UploadProgressModal from "./UploadProgressModal";
import SuccessSnackbar from "./SuccessSnackbar";
import placeholder from '../../placeholder.png';


const customIcon = L.icon({
  iconUrl: placeholder,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const CreatePost = () => {
  const [post, setPost] = useState({ location: '', title: 'blank', content: '', lat: '', lng: '' });
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [blockNavigation, setBlockNavigation] = useState(false);

  const navigate = useNavigate();

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
    const map = L.map('map').setView([51.505, 19.000], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker;

    const onMapClick = (e) => {
      const { lat, lng } = e.latlng;
      setPost((prev) => ({ ...prev, lat, lng, location: `${lat.toFixed(5)}, ${lng.toFixed(5)}` }));

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    };

    map.on('click', onMapClick);

    return () => {
      map.off('click', onMapClick);
      map.remove();
    };
  }, []);

  const handleAddAttachments = (newFiles) => {
    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setBlockNavigation(true);

    try {
      const uploadPromise = createPost(post, attachments);
      const minTimePromise = new Promise((resolve) => setTimeout(resolve, 2000));

      await Promise.all([uploadPromise, minTimePromise]);

      setPost({ location: '', title: 'blank', content: '', lat: '', lng: '' });
      setAttachments([]);
      setShowSuccess(true);

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      setBlockNavigation(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <Paper elevation={3} sx={{ pt: 1, pb: 1, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="sm" sx={{ mt: 4 }} style={{ marginBottom: '50px' }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h2" color="primary" gutterBottom>
            Dodaj przystanek Podróżnika
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Miejsce (kraj, miejscowość lub współrzędne)"
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            margin="normal"
          />
          <Box id="map" style={{ height: '400px', width: '100%', marginTop: '20px', borderRadius: '8px' }}></Box>
          <TextField
            fullWidth
            label="Coś o sobie, miejscu i czasie"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            multiline
            rows={4}
            margin="normal"
          />

          <AttachmentsGrid attachments={attachments} onRemoveFile={handleRemoveFile} />

          <MediaSelectionButtons isUploading={isUploading} onAddFiles={handleAddAttachments} />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 4 }}
            disabled={isUploading}
          >
            {isUploading ? 'Przesyłanie...' : 'Wyślij'}
          </Button>
        </Box>


        <UploadProgressModal open={isUploading} />
        <SuccessSnackbar open={showSuccess} onClose={handleCloseSuccess} />
      </Container>
    </Paper>
  );
};

export default CreatePost;
