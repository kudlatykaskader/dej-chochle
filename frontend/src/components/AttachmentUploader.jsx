import React, { useRef } from 'react';
import { Button, Stack } from '@mui/material';

/**
 * AttachmentUploader
 * 
 * - Renders two buttons:
 *   1. "Dodaj z pliku": normal file input
 *   2. "Zrób zdjęcie": camera capture for images
 *
 * - Calls onAddFiles with the newly selected files.
 */
const AttachmentUploader = ({ onAddFiles }) => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Trigger normal file input
  const handleSelectFromFileSystem = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Trigger camera input
  const handleSelectFromCamera = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  // On file(s) selected
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onAddFiles(files);
    }
    // Clear the input value so we can re-select the same file if needed
    event.target.value = null;
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      {/* Hidden input for normal file system */}
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button variant="contained" onClick={handleSelectFromFileSystem}>
        Dodaj z pliku
      </Button>

      {/* Hidden input for camera capture (image only) */}
      <input
        type="file"
        accept="image/*"
        capture="camera"
        ref={cameraInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button variant="outlined" onClick={handleSelectFromCamera}>
        Zrób zdjęcie
      </Button>
    </Stack>
  );
};

export default AttachmentUploader;
