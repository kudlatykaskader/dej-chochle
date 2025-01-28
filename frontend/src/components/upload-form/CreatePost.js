// CreatePost.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import BackButton from "../buttons/BackButton";
import { useNavigate } from "react-router-dom";
import { createPost } from "../PostApi";

// Our extracted components
import AttachmentsGrid from "./AttachmentsGrid";
import MediaSelectionButtons from "./MediaSelectionButtons";
import UploadProgressModal from "./UploadProgressModal";
import SuccessSnackbar from "./SuccessSnackbar";

const CreatePost = () => {
  const [post, setPost] = useState({ location: '', title: 'blank', content: '' });
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [blockNavigation, setBlockNavigation] = useState(false);

  const navigate = useNavigate();

  // Prevent window close / navigation during upload
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

  // Merge the newly uploaded files into attachments
  const handleAddAttachments = (newFiles) => {
    setAttachments((prev) => [...prev, ...newFiles]);
  };

  // Remove a file by index
  const handleRemoveFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setBlockNavigation(true);

    try {
      // Force a minimum 2 second "upload"
      const uploadPromise = createPost(post, attachments);
      const minTimePromise = new Promise((resolve) => setTimeout(resolve, 2000));

      await Promise.all([uploadPromise, minTimePromise]);

      // Reset post data
      setPost({ location: '', title: 'blank', content: '' });
      setAttachments([]);
      setShowSuccess(true);

      // Navigate after a short delay
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      setBlockNavigation(false);
    }
  };

  // Close success snackbar
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Top Header */}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h2" color="primary" gutterBottom>
          Dodaj nowy wpis dziennika
        </Typography>
        <Box sx={{ m: 'auto 10px' }}>
          <BackButton disabled={isUploading} />
        </Box>
      </Box>

      {/* FORM */}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        {/* Post Fields */}
        <TextField
          fullWidth
          label="Miejsce (kraj, miejscowość)"
          value={post.location}
          onChange={(e) => setPost({ ...post, location: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Notatka (np. kim jesteś, skąd dostałeś totem, komu go przekażesz)"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          multiline
          rows={4}
          margin="normal"
        />

        {/* Attachments Preview */}
        <AttachmentsGrid attachments={attachments} onRemoveFile={handleRemoveFile} />

        {/* Media Selection (file system, camera) */}
        <MediaSelectionButtons isUploading={isUploading} onAddFiles={handleAddAttachments} />

        {/* Submit Button */}
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

      {/* Upload Progress & Success Notifications */}
      <UploadProgressModal open={isUploading} />
      <SuccessSnackbar open={showSuccess} onClose={handleCloseSuccess} />
    </Container>
  );
};

export default CreatePost;
