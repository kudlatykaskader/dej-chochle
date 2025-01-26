// Timeline.js
import React from 'react';
import TimelineMUI from '@mui/lab/Timeline';
// MUI hooks for responsive behavior
import { useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';


// Create a styled Timeline that removes the extra left padding
const CompactTimeline = styled(TimelineMUI)(({ theme }) => ({
    padding: 0,
    margin: 0,
    '& .MuiTimelineItem-root:before': {
      flex: 0,    // Default is "1", which pushes content to the right
      padding: 0, // Remove default left padding
    },
  }));

const Timeline = ({ children, ...props }) => {
  const theme = useTheme();
  

  // "sm" breakpoint typically covers phones
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Use "right" for small screens, "alternate" for medium+ screens
//   const timelinePosition = isSmallScreen ? 'right' : 'alternate';
  
  const timelinePosition = 'right'
  return (
    <CompactTimeline position={timelinePosition} {...props} >
      {children}
    </CompactTimeline>
  );
};

export default Timeline;
