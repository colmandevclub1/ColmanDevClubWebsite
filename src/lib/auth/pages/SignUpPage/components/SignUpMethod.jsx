import { EmailRounded } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Card, Stack, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from 'src/config/firebase-config';

const SignUpMethod = ({ setMethodClicked, setEmail, setName, setProfilePicPreview }) => {
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      setEmail(user.email);
      setName(user.displayName);
      setProfilePicPreview(user.photoURL);
    } catch (error) {
      console.log(error);
    } finally {
      setMethodClicked(true);
    }
  };

  return (
    <Card
      variant="filled"
      sx={{
        height: { xs: '100%', lg: '30svh' },
        width: { xs: '100%', lg: '35svw' },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: '150px'
      }}
    >
      <Stack p={{ xs: 5, lg: 1 }} gap={5} sx={{}}>
        <Typography variant="h4" textAlign="center">
          The registration for the club will open on Sunday 03/11/24
        </Typography>
        <Typography variant="h4" color="primary" textAlign="center" sx={{fontWeight: 'bold'}}>
          Stay tuned!
        </Typography>
      </Stack>
      {/* <Stack p={{ xs: 5, lg: 1 }} gap={5}>
        <Stack>
          <Typography variant="caption" color={'primary'} textAlign={'end'}>
            *Recommended
          </Typography>
          <Button
            variant="outlined"
            endIcon={<GoogleIcon />}
            fullWidth
            sx={{ justifyContent: 'space-between' }}
            onClick={() => handleGoogleSignIn()}
          >
            Submit using Google
          </Button>
        </Stack>
        <Button
          variant="outlined"
          fullWidth
          sx={{ justifyContent: 'space-between' }}
          onClick={() => setMethodClicked(true)}
          endIcon={<EmailRounded />}
        >
          Submit using Email
        </Button>
      </Stack> */}
    </Card>
  );
};

export default SignUpMethod;
