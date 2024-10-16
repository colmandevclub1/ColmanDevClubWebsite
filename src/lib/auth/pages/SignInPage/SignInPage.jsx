import * as React from 'react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { auth } from 'src/config/firebase-config';
import { theme } from 'src/theme';
import { TransitionsModal } from 'src/ui';

const SignInPage = () => {
  const [formValues, setFormValues] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [resetEmailValue, setResetEmailValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  <Typography
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  <Typography>Don't have an account? Sign Up</Typography>
                </Link>
              </Grid>
            </Grid>
            <TransitionsModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              closeOnOverlay={true}
              btnText="Reset Password"
              btnOnClick={async () => {
                //TODO -> need to fix. not working
                if (resetEmailValue !== '') {
                  setEmailSent(true);
                  await sendPasswordResetEmail(auth, resetEmailValue);
                  console.log('Password reset email sent');
                  setOpenModal(false);
                }
              }}
            >
              {!emailSent ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  id="emailReset"
                  onChange={(e) => setResetEmailValue(e.target.value)}
                />
              ) : (
                <Typography>{'Password reset email sent'}</Typography>
              )}
            </TransitionsModal>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
