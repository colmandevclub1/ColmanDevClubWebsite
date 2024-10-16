import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ArrowIconContainer = styled(Stack)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  width: 80,
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.secondary.main,
}));

export const ArrowButtonContainer = styled(Stack)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  flexDirection: theme.direction === 'rtl' ? 'row' : 'row-reverse',
}));
