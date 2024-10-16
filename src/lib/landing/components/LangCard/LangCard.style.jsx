import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)(({ theme }) => ({
  flex: '1 1 ',
  padding: '1rem',
  display: 'flex',
  justifyItems: 'end',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  transition: 'transform 0.3s ease-in-out',
  ':hover': {
    boxShadow: '20px 20px 70px #1f1f5355',
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));
