import * as React from 'react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { auth } from 'src/config/firebase-config';
import { theme } from 'src/theme';
import { TransitionsModal } from 'src/ui';
import { UserAuth } from '../../authContext';
import GoogleIcon from '@mui/icons-material/Google';

const SignInPage = () => {
  const [formValues, setFormValues] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [resetEmailValue, setResetEmailValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const { googleSignIn } = UserAuth();
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
    await googleSignIn()
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
                    display: "flex", justifyContent: "center", alignItems: "center"}} >
                  <GoogleIcon />
                  
                </Button>
            </Box>
            <SignInActionButtons openModal={openModal}
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


const SignInActionButtons = ({openModal, setOpenModal, emailSent, resetEmailValue, setEmailSent, setResetEmailValue, sendPasswordResetEmail}) => {
  return (
    <> 
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
    </>
  )
}