import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { StyledCard } from './LangCard.style';

const LangCard = ({ link, icon, color, title, description }) => {
  const onClick = () => window.open(link, '_blank');
  return (
    <StyledCard>
      <Stack direction={{ xs: 'row-reverse', md: 'column' }} alignItems="center" gap={{ xs: 2, md: 2 }}>
        <IconButton onClick={onClick} size="large">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#28287080', width: '100%', height: '100%', padding: 1.2, borderRadius: 5 }}>
            <Stack width={25} height={25} >
              <FontAwesomeIcon icon={icon} color={color} />
            </Stack>
          </Box>
        </IconButton>
        <Typography variant="h5" color="primary" fontWeight={900} sx={{ direction: 'rtl', alignSelf: 'center' }}>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ direction: 'rtl', height: { lg: '3rem', xs: '2rem' } }}>
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
