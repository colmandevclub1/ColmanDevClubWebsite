import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';

import { TransitionsModal } from 'src/ui';

export const SignInActionButtons = ({auth, openModal, setOpenModal, emailSent, resetEmailValue, setEmailSent, setResetEmailValue, sendPasswordResetEmail}) => {
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