import { Link, Stack, TextField, Typography } from '@mui/material';

import { TransitionsModal } from 'src/ui';

export const SignInActionButtons = ({
  auth,
  openModal,
  setOpenModal,
  emailSent,
  resetEmailValue,
  setEmailSent,
  setResetEmailValue,
  sendPasswordResetEmail,
}) => {
  return (
    <>
      <Stack gap={2} flexWrap={'wrap'} justifyContent={'space-between'} width={'100%'} direction={'row'}>
        <Link href="#" variant="body2" color={'#fff'}>
          <Typography
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Forgot password?
          </Typography>
        </Link>
        <Link href="/signup" variant="body2" color={'#fff'}>
          <Typography>Don't have an account? Sign Up</Typography>
        </Link>
      </Stack>
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
  );
};
