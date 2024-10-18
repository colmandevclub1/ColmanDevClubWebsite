import { EmailRounded } from '@mui/icons-material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Button, Card, Stack } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, facebookProvider } from 'src/config/firebase-config';

const SignUpMethod = ({ setMethodClicked, setProfilePic, setEmail, setName, setFormValues }) => {

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
    }

    return (
        <Card variant="filled" sx={{ height: '30svh', width: '35svw' }}>
            <Stack p={5} gap={5}>
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
        </Card >
    );
};

export default SignUpMethod;
