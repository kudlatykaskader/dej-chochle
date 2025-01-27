import React, { useState, useEffect, useCallback } from 'react';
import { Box, Modal, IconButton, Stack, useTheme } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageGallery = ({ attachments }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const theme = useTheme();

  /** Go to previous image */
  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + attachments.length) % attachments.length);
  }, [attachments]);

  /** Go to next image */
  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % attachments.length);
  }, [attachments]);

  /** Listen for arrow keys only when the modal is open */
  useEffect(() => {
    if (!isFullscreen) return; // If not fullscreen, do nothing

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handlePrev, handleNext]);

  // --- AFTER HOOKS, check if attachments is empty ---
  if (!attachments || attachments.length === 0) {
    // We still call all hooks above to keep order consistent.
    return null;
  }

  // --- EVENT HANDLERS ---

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen((prev) => !prev);
  };

  // --- RENDER ---

  return (
    <Box sx={{ mt: 2 }}>
      {/* Main Image Display */}
      <Box
        sx={{
          position: 'relative',
          height: 300,
          borderRadius: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover .fullscreen-button': {
            opacity: 1,
          },
        }}
        onClick={handleFullscreenToggle}
      >
        <img
          src={attachments[selectedIndex].url}
          alt={attachments[selectedIndex].filename}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <IconButton
          className="fullscreen-button"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            opacity: 0.7,
            transition: 'opacity 0.3s',
          }}
        >
          <FullscreenIcon />
        </IconButton>
      </Box>

      {/* Thumbnail Strip */}
      {attachments.length > 1 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mt: 1,
            overflowX: 'auto',
            py: 1,
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.divider,
              borderRadius: 2,
            },
          }}
        >
          {attachments.map((attachment, index) => (
            <Box
              key={index}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                flexShrink: 0,
                width: 80,
                height: 60,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: selectedIndex === index
                  ? `2px solid ${theme.palette.primary.main}`
                  : 'none',
                opacity: selectedIndex === index ? 1 : 0.7,
                transition: 'all 0.2s ease',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <img
                src={attachment.url}
                alt={attachment.filename}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Stack>
      )}

      {/* Fullscreen Modal */}
      <Modal
        open={isFullscreen}
        onClose={handleFullscreenToggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}
        >
          <img
            src={attachments[selectedIndex].url}
            alt={attachments[selectedIndex].filename}
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
            }}
          />

          {/* Close button (top-right) */}
          <IconButton
            onClick={handleFullscreenToggle}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
            }}
          >
            <FullscreenExitIcon />
          </IconButton>

          {/* Prev button (left side) */}
          {attachments.length > 1 && (
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 16,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.6)',
                },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          {/* Next button (right side) */}
          {attachments.length > 1 && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 16,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.6)',
                },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageGallery;
