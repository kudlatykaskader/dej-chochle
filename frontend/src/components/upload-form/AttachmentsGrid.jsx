// AttachmentsGrid.jsx
import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AttachmentsGrid = ({ attachments, onRemoveFile }) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {attachments.map((file, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card>
            {file.type.startsWith('image/') ? (
              <CardMedia
                component="img"
                height="140"
                image={URL.createObjectURL(file)}
                alt={file.name}
              />
            ) : file.type.startsWith('video/') ? (
              <CardMedia
                component="video"
                height="140"
                controls
                src={URL.createObjectURL(file)}
                alt={file.name}
              />
            ) : (
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {file.name}
                </Typography>
              </CardContent>
            )}
            <CardContent>
              <IconButton color="secondary" onClick={() => onRemoveFile(index)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AttachmentsGrid;
