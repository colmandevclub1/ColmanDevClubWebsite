import { EmailRounded } from '@mui/icons-material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Button, Card, Stack, useMediaQuery, useTheme } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, facebookProvider } from 'src/config/firebase-config';

const SignUpMethod = ({ setMethodClicked, setProfilePic, setEmail, setName, setFormValues }) => {
    const theme = useTheme();
    const isLgOrBigger = useMediaQuery(theme.breakpoints.up('lg'));

    const handleFacebookSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            setName(result.user['displayName']);
            setEmail(result.user['email']);
            setProfilePic(result.user['photoURL']);
            setFormValues((prev) => {
                return {
                    ...prev, fullName: result.user['displayName'],
                    email: result.user['email'],
                    profilePic: result.user['photoURL']
                }
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            setMethodClicked(true);
        }
    };

    return (
        <Card variant="filled" sx={{ height: isLgOrBigger ? '30svh' : '100%', width: isLgOrBigger ? '35svw' : '90%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Stack p={isLgOrBigger ? 5 : 1} gap={5}>
                <Button
                    variant="outlined"
                    endIcon={<FacebookRoundedIcon />}
                    fullWidth
                    sx={{ justifyContent: 'space-between' }}
                    onClick={() => handleFacebookSignIn()}
                >
                    Submit using Facebook
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ justifyContent: 'space-between' }}
                    onClick={() => setMethodClicked(true)}
                    endIcon={<EmailRounded />}
                >
                    Submit using Email
                </Button>
            </Stack>
        </Card>
    );
};

export default SignUpMethod;
