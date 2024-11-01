import * as React from 'react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { auth } from 'src/config/firebase-config';
import { theme } from 'src/theme';
import { UserAuth } from '../../authContext';
import GoogleIcon from '@mui/icons-material/Google';
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
    await signInWithGoogleIfUserExist()
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon sx={{ color: 'white' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, gap: "8px", pb: "8px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) =>
                setFormValues((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
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
            <Box display='flex' alignItems="center" justifyContent="space-between" gap="32px" >
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                Sign In
              </Button>
              
                <Button 
                  type="submit" 
                  variant="outlined"
                  onClick={handleGoogleSignIn} 
                  sx={{
                    width: "65px", height: "65px", borderRadius: "50%",
                    display: "flex", justifyContent: "center", alignItems: "center"
                  }} >
                  <GoogleIcon />
                  
                </Button>
            </Box>
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;

