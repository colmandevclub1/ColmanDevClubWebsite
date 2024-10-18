import { EmailRounded } from '@mui/icons-material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Button, Card, Stack } from '@mui/material';

const options = [
  {
    label: 'Submit using Facebook',
    icon: <FacebookRoundedIcon />,
  },
  {
    label: 'Submit using Email',
    icon: <EmailRounded />,
  },
];

const SignUpMethod = ({ setMethodClicked }) => {
  return (
    <Card variant="filled">
      <Stack
        p={{ xs: 2, md: 5 }}
        gap={{ xs: 3, md: 5 }}
        height={{ xs: 'auto', md: '30svh' }}
        width={{ xs: '35svh', md: '45svh' }}
      >
        {options.map((option) => (
          <Button
            variant="outlined"
            endIcon={option.icon}
            fullWidth
            sx={{ justifyContent: 'space-between' }}
            onClick={() => setMethodClicked(true)}
          >
            {option.label}
          </Button>
        ))}
      </Stack>
    </Card>
  );
};

export default SignUpMethod;
