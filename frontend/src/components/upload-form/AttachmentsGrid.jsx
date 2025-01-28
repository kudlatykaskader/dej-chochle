// AttachmentsGrid.jsx
import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AttachmentsGrid = ({ attachments, onRemoveFile }) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {attachments.map((file, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card sx={{ position: 'relative' }}>
            {file.type.startsWith('image/') ? (
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={URL.createObjectURL(file)}
                  alt={file.name}
                />
                <IconButton
                  color="secondary"
                  onClick={() => onRemoveFile(index)}
                  sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : file.type.startsWith('video/') ? (
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="video"
                  height="140"
                  controls
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
                <IconButton
                  color="secondary"
                  onClick={() => onRemoveFile(index)}
                  sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {file.name}
                </Typography>
                <IconButton color="secondary" onClick={() => onRemoveFile(index)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AttachmentsGrid;
