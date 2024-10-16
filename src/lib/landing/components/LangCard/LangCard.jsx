import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { StyledCard } from './LangCard.style';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const LangCard = ({ link, icon, color, title, description }) => {
  const onClick = () => window.open(link, '_blank');
  return (
    <StyledCard>
      <Stack direction={{ xs: 'row-reverse', md: 'column' }} alignItems="flex-end" gap={{ xs: 2, md: 2 }}>
        <IconButton onClick={onClick} size="large">
          <Stack width={25} height={25}>
            <FontAwesomeIcon icon={icon} color={color} />
          </Stack>
        </IconButton>
        <Typography variant="h5" color="primary" fontWeight={900} sx={{ direction: 'rtl' }}>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ direction: 'rtl', height: '2rem' }}>
        {description}
      </Typography>
      <Box style={{ width: '100%' }}>
        <IconButton onClick={onClick}>
          <KeyboardBackspaceIcon color="primary" />
        </IconButton>
      </Box>
    </StyledCard>
  );
};

export default LangCard;
