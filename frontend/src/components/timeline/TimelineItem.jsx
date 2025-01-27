// TimelineItem.jsx
import React from 'react';
import TimelineItemMUI from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';

import ImageGallery from './ImageGallery';
import './TimelineItem.css';  // <-- Import the CSS file

const TimelineItem = ({ time, place, header, paragraph, attachments }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TimelineItemMUI
      className={`timeline-item ${isMobile ? 'mobile' : ''}`}
    >
      {/* Timeline Separator */}
      <TimelineSeparator
        className={`timeline-separator ${isMobile ? 'mobile' : ''}`}
      >
        <TimelineDot
          className={`timeline-dot ${isMobile ? 'mobile' : ''}`}
          style={{
            // You can still override or dynamically set styles from the theme if needed:
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
          }}
        >
          <PlaceIcon color="primary" />
        </TimelineDot>
        {/* Connector (shown only on larger screens) */}
        {!isMobile && (
          <TimelineConnector className="timeline-connector" />
        )}
      </TimelineSeparator>

      {/* Timeline Content */}
      <TimelineContent
        className={`timeline-content ${isMobile ? 'mobile' : ''}`}
      >
        <Paper
          elevation={2}
          className={`timeline-paper ${isMobile ? 'mobile' : ''}`}
        >
          {/* Date & Location */}
          <Typography
            variant="caption"
            className="time-place"
          >
            {time}
            <span className="separator-dot">•</span>
            {place}
          </Typography>

          {/* Header */}
          <Typography variant="h6" className="header">
            {header}
          </Typography>

          {/* Paragraph */}
          <Typography variant="body2" className="paragraph">
            {paragraph}
          </Typography>

          {/* Image Gallery */}
          <ImageGallery attachments={attachments} />
        </Paper>
      </TimelineContent>
    </TimelineItemMUI>
  );
};

export default TimelineItem;
