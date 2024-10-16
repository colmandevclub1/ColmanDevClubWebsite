import { Box } from '@mui/material';
import React from 'react';

export const YouTubeVideo = ({ videoId, width, height }) => {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <iframe 
        id={`ytplayer-${videoId}`} 
        type="text/html" 
        title="YouTube video player"
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0" 
        allowFullScreen
      ></iframe>
    </Box>
  );
};
