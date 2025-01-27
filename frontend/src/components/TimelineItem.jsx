// TimelineItem.js
import React from 'react';
import TimelineItemMUI from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';

import ImageGallery from './ImageGallery';

const TimelineItem = ({ time, place, header, paragraph, attachments }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TimelineItemMUI
      sx={{
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'flex-start',
        minHeight: 0,
        '&:before': {
          flex: 0,
          padding: 0
        }
      }}
    >
      {/* Timeline Separator - Mobile optimized */}
      <TimelineSeparator
        sx={{
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: 'center',
          width: isMobile ? '100%' : 'auto',
          mb: isMobile ? 1 : 0,
          px: isMobile ? 2 : 0
        }}
      >
        <TimelineDot 
          sx={{ 
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            padding: '8px',
            m: isMobile ? '0 auto' : '0'
          }}
        >
          <PlaceIcon color="primary" />
        </TimelineDot>
        {!isMobile && (
          <TimelineConnector 
            sx={{ 
              backgroundColor: theme.palette.divider,
              height: '100%',
              width: '2px',
              flexGrow: 1
            }} 
          />
        )}
      </TimelineSeparator>

      {/* Content Area */}
      <TimelineContent
        sx={{ 
          py: 2,
          px: 2,
          flex: 1,
          width: '100%',
          ...(isMobile && {
            pt: 0,
            px: 0
          })
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: theme.shadows[4]
            },
            ...(isMobile && {
              p: 2,
              mt: 1
            })
          }}
        >
          {/* Rest of your content remains the same */}
          <Typography 
            variant="caption" 
            display="block" 
            color="text.secondary" 
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {time} 
            <span style={{ color: theme.palette.primary.main }}>•</span>
            {place}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {header}
          </Typography>
          
          <Typography variant="body2" paragraph>
            {paragraph}
          </Typography>

          <ImageGallery attachments={attachments} />

          </Paper>
      </TimelineContent>
    </TimelineItemMUI>
  );
};

export default TimelineItem;