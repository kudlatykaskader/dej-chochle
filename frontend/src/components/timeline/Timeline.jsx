// Timeline.js
import React from 'react';
import TimelineMUI from '@mui/lab/Timeline';
import { useTheme, useMediaQuery } from '@mui/material';

const Timeline = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TimelineMUI
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
    </TimelineMUI>
  );
};

export default Timeline;