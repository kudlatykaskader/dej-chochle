import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import BackButton from "./buttons/BackButton";
import { useNavigate } from "react-router-dom";
import { createPost } from "./PostApi";
import AttachmentUploader from "./AttachmentUploader";
import AttachmentsGrid from "./AttachmentsGrid";

const CreatePost = () => {
  const [post, setPost] = useState({ location: '', title: '', content: '' });
  const [attachments, setAttachments] = useState([]);
  const navigate = useNavigate();

  /**
   * Handler for adding new files (either from the file system or the camera).
   * We merge them into our existing attachments state.
   */
  const handleAddAttachments = (newFiles) => {
    setAttachments(prev => [...prev, ...newFiles]);
  };

  /**
   * Remove a single attachment from the list by index.
   */
  const handleRemoveFile = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Submit the post: send data + attachments to the server.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    createPost(post, attachments, () => {
      setPost({ location: '', title: '', content: '' });
      setAttachments([]);
      navigate("/");
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h2" color="primary" gutterBottom>
          Stwórz nowy post
        </Typography>
        <Box sx={{ m: 'auto 10px' }}>
          <BackButton />
        </Box>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        {/* LOCATION */}
        <TextField
          fullWidth
          label="Lokalizacja"
          value={post.location}
          onChange={(e) => setPost({ ...post, location: e.target.value })}
          margin="normal"
        />

        {/* TITLE */}
        <TextField
          fullWidth
          label="Tytuł"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          margin="normal"
        />

        {/* CONTENT */}
        <TextField
          fullWidth
          label="Treść"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          multiline
          rows={4}
          margin="normal"
        />

        {/* Attachments Preview Grid */}
        <AttachmentsGrid
          attachments={attachments}
          onRemoveFile={handleRemoveFile}
        />

        {/* Attachment Uploader (File & Camera) */}
        <AttachmentUploader onAddFiles={handleAddAttachments} />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 4 }}
        >
          Wyślij
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePost;
