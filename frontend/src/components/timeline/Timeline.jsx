// Timeline.js
import React from 'react';
import TimelineMUI from '@mui/lab/Timeline';
import { useTheme, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';

// Create a styled Timeline that removes the extra left padding
const CompactTimeline = styled(TimelineMUI)(({ theme }) => ({
  padding: 0, // remove extra padding on the Timeline container if desired
  margin: 0,
  // The important part:
  '& .MuiTimelineItem-root:before': {
    flex: 0,    // Default is "1", which pushes content to the right
    padding: 0, // Remove default left padding
  },
}));

const Timeline = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <CompactTimeline
      sx={{
        p: 0,
        m: 0,
        ...(isMobile && {
          '& .MuiTimelineItem-root': {
            flexDirection: 'column',
            '&:before': {
              display: 'none'
            }
          }
        })
      }}
    >
      {children}
    </CompactTimeline>
  );
};

export default Timeline;