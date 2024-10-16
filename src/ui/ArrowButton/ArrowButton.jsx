import EastIcon from '@mui/icons-material/East';
import { Button, Stack } from '@mui/material';
import { ArrowButtonContainer, ArrowIconContainer } from './ArrowButton.styles';

const ArrowButton = ({ children, rtl = true, ...rest }) => {
  return (
    <Button variant="contained" size="large" {...rest}>
      <ArrowButtonContainer>
        <Stack px={4}>{children}</Stack>
        <ArrowIconContainer {...(rest.disabled && { display: 'none' })}>
          <EastIcon
            color="primary"
            sx={{
              transform: rtl ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          />
        </ArrowIconContainer>
      </ArrowButtonContainer>
    </Button>
  );
};

export default ArrowButton;
