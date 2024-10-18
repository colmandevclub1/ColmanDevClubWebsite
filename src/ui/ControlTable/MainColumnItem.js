import React, { useState } from 'react';
import { IconButton, Modal, Box,Avatar } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './mainColumnItem.css'; 

const MainColumnItem = ({data}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="main-column-container">
      <Avatar key={data.title} src={data.img ?? ''} />
      <div key={data.title} className="main-column-text">
        {data.title && (
            <div key={data.title} className="main-column-title" style={{color:'#F6C927'}}>
              {data.title}
            </div>
          )}
        {data.subtitle && (
            <div key={data.subtitle} className="main-column-subtitle">
              {data.subtitle}
            </div>
          )}
      </div>
      <IconButton onClick={handleOpen} className="main-column-details-button" sx={{padding:0, width:'40px', height:'40px',backgroundColor:'#131331'}}>
        <MoreHorizIcon className="main-column-details-icon" style={{color:'white'}} />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box className="main-column-modal">
          <h3>Details</h3>
          <p>{data.details || 'No additional details available'}</p>
        </Box>
      </Modal>
    </div>
  );
};

export default MainColumnItem;
