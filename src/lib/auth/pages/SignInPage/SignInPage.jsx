import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import * as React from 'react';
import { useNavigate } from 'react-router';

import { Box, Button, Card, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import { auth } from 'src/config/firebase-config';
import { ArrowButton } from 'src/ui';
import { UserAuth } from '../../authContext';
import { SignInActionButtons } from './SignInActionButtons';

const SignInPage = () => {
  const [formValues, setFormValues] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [resetEmailValue, setResetEmailValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const { signInWithGoogleIfUserExist } = UserAuth();
  const navigate = useNavigate();

  //TODO: use the auth context
  const handleSubmit = async (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        localStorage.setItem('userToken', JSON.stringify(userCredential._tokenResponse.idToken));
        navigate('/syllabus');
      })
      .catch((error) => {
        setError(true);
      });
  };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    await signInWithGoogleIfUserExist();
  };

  return (
    <Container sx={{ height: '100svh' }} maxWidth="lg">
      <Stack pt={{ xs: 4, md: 8, lg: 12 }} alignItems={'center'} gap={{ xs: 5, md: 5, lg: 10 }}>
        <Typography
          variant="h4"
          sx={{
            display: 'flex',
            fontWeight: 900,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Login To Your
          <Typography color="primary" variant="h4" fontWeight={900} ml={1}>
            Account
          </Typography>
          .
        </Typography>
        <Stack gap={{ xs: 2, md: 5, lg: 10 }} width={'100%'} direction={{ xs: 'column', lg: 'row' }}>
          <Card component="form" onSubmit={handleSubmit} sx={{ p: { xs: 5, md: 5, lg: 10 }, flex: 1 }}>
            <Typography variant="h6">Email</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="email"
              name="email"
              placeholder="user@email.com"
              autoComplete="email"
              autoFocus
              onChange={(e) =>
                setFormValues((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />
            <Typography variant="h6">Password</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              placeholder="********"
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) =>
                setFormValues((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
            {error && (
              <Typography
                sx={{
                  textAlign: 'start',
                  color: '#f44336',
                }}
              >
                {'Email or password is incorrect'}
              </Typography>
            )}
            <Box mt={2} sx={{ display: { lg: 'none' } }}>
              <IconButton onClick={handleGoogleSignIn} size="large" variant="squared">
                <GoogleIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
            <ArrowButton type="submit" variant="contained" rtl={false} sx={{ marginTop: 3 }}>
              <Typography textTransform={'none'} variant="h6">
                Login To Your Account
              </Typography>
            </ArrowButton>
          </Card>
          <Card
            component="form"
            variant="light"
            sx={{ p: { md: 5, lg: 10 }, flex: 1, display: { xs: 'none', md: 'none', lg: 'block' } }}
          >
            <Button
              variant="outlined"
              endIcon={<GoogleIcon />}
              fullWidth
              sx={{ justifyContent: 'space-between' }}
              onClick={handleGoogleSignIn}
            >
              Sign In With Google
            </Button>
          </Card>
        </Stack>
        <SignInActionButtons
          openModal={openModal}
          auth={auth}
          setOpenModal={setOpenModal}
          emailSent={emailSent}
          resetEmailValue={resetEmailValue}
          setEmailSent={setEmailSent}
          setResetEmailValue={setResetEmailValue}
          sendPasswordResetEmail={sendPasswordResetEmail}
        />
      </Stack>
    </Container>
  );
};

export default SignInPage;
