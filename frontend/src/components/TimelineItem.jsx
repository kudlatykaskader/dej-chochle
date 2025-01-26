// TimelineItem.js
import React from 'react';
import TimelineItemMUI from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import Typography from '@mui/material/Typography';

const TimelineItem = ({ time, place, header, paragraph, imageUrl }) => {
  return (
    <TimelineItemMUI>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>

      {/* Everything is now in the main content block. */}
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        {/* Date & location on top */}
        <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
          {time} &middot; {place}
        </Typography>

        <Typography variant="h6" gutterBottom>
          {header}
        </Typography>
        
        <Typography variant="body2">
          {paragraph}
        </Typography>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${header} image`}
            style={{ maxWidth: '100%', marginTop: 8 }}
          />
        )}
      </TimelineContent>
    </TimelineItemMUI>
  );
};

export default TimelineItem;
