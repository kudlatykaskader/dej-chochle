import React, { useState, useEffect, useCallback } from 'react';
import { Box, Modal, IconButton } from '@mui/material';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/* Import the CSS here */
import './styles.css';

const ImageGallery = ({ attachments }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!attachments || attachments.length === 0) return null;

  // Handlers for previous/next images
  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + attachments.length) % attachments.length);
  }, [attachments]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % attachments.length);
  }, [attachments]);

  // Listen for ArrowLeft/ArrowRight only in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') handlePrev();
        else if (e.key === 'ArrowRight') handleNext();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFullscreen, handlePrev, handleNext]);

  // Toggle fullscreen modal
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Click a thumbnail
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  const currentImage = attachments[selectedIndex];

  return (
    <Box className="image-gallery">
      {/* Main (non-fullscreen) Image */}
      <Box className="main-image-wrapper" onClick={handleFullscreenToggle}>
        <img
          className="main-image"
          src={currentImage.url}
          alt={currentImage.filename}
        />

        {/* Fullscreen Overlay Button */}
        <IconButton className="fullscreen-button">
          <FullscreenIcon />
        </IconButton>
      </Box>

      {/* Thumbnails (if more than one) */}
      {attachments.length > 1 && (
        <div className="thumbnail-strip">
          {attachments.map((attachment, index) => {
            const isSelected = selectedIndex === index;
            return (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`thumbnail-box ${isSelected ? 'selected' : ''}`}
              >
                <img
                  className="thumbnail-image"
                  src={attachment.url}
                  alt={attachment.filename}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Modal */}
      <Modal
        open={isFullscreen}
        onClose={handleFullscreenToggle}
        className="fullscreen-modal"
      >
        <div className="modal-content">
          {/* Fullscreen Image */}
          <img
            className="fullscreen-image"
            src={currentImage.url}
            alt={currentImage.filename}
          />

          {/* Close Button (top-right) */}
          <IconButton className="close-button" onClick={handleFullscreenToggle}>
            <FullscreenExitIcon />
          </IconButton>

          {/* Prev / Next Buttons */}
          {attachments.length > 1 && (
            <>
              <IconButton className="nav-button left" onClick={handlePrev}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton className="nav-button right" onClick={handleNext}>
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </div>
      </Modal>
    </Box>
  );
};

export default ImageGallery;
