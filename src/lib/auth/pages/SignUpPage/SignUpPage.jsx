import { Box, Checkbox, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as React from 'react';
import { useNavigate } from 'react-router';
import { EntranceAnimation } from 'src/animation';
import { allRules, errorMessages, labels } from 'src/data';
import { useCreateUser } from 'src/hooks/firebase.hooks';
import { fetchData } from 'src/hooks/useFirestoreFetch';
import { ArrowButton, TransitionsModal } from 'src/ui';
import FormInputField from 'src/ui/FormInputField';
import FormSelectField from 'src/ui/FormSelectField';
import SignUpMethod from './components/SignUpMethod';
import css from './style.module.css';
import { toast } from 'react-toastify';
import Loader from './components/Loader';


const FIELDS_MAP = {
  TextField: FormInputField,
  Select: FormSelectField,
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const createUser = useCreateUser();
  const [openModal, setOpenModal] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});
  const [validationErrors, setValidationErrors] = React.useState({});
  const [openRulesModal, setOpenRulesModal] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [rules, setRules] = React.useState(false);
  const [methodClicked, setMethodClicked] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState(null);
  const [profilePicPreview, setProfilePicPreview] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [checkBoxes, setCheckBoxes] = React.useState({
    first: false,
    second: false,
  });

  const storage = getStorage();

  const onSignupHandler = async () => {
    if (!checkBoxes.first && !checkBoxes.second) {
      toast.error('יש לבחור תאריך מיון');
      return;
    }

    const validationState = labels.reduce((obj, { key, validator }) => {
      obj[key] = !validator(formValues[key]);
      return obj;
    }, {});

    setValidationErrors(validationState);

    if (Object.keys(validationState).length === 0) return;
    for (const key in validationState) {
      if (key === 'experienceDetails' && formValues['experience'] !== 'כן') {
        validationState[key] = validationState['experience'];
      }

      if (validationState[key]) {
        return;
      }
    }
    if (!rules) return;
    if ((await fetchData('users')).find((user) => user.formValues?.email === formValues['email'])) {
      alert('משתמש קיים במערכת');
      navigate('/');
      return;
    }

    setLoader(true);
    let profilePicUrl = '';
    if (profilePic) {
      const storageRef = ref(storage, `profilePics/${profilePic.name}`);
      await uploadBytes(storageRef, profilePic);
      profilePicUrl = await getDownloadURL(storageRef);
    }
    setLoader(false);


    let sortingDates = '';
    if (checkBoxes.first && checkBoxes.second) {
      sortingDates = '10.11.2024, 14.11.2024';
    }
    else if (checkBoxes.first) {
      sortingDates = '10.11.2024';
    }
    else {
      sortingDates = '14.11.2024';
    }

    setOpenModal(true);
    const newUser = { ...formValues, profilePic: profilePicUrl, sortingDate: sortingDates, date: new Date().toLocaleDateString() };
    createUser.mutate(newUser);
  };

  const inputHandler = (validator, key, value) => {
    const isValid = validator(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [key]: !isValid,
    }));
  };

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const goHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <EntranceAnimation>
      <Container
        maxWidth="md"
        sx={{
          paddingTop: '3rem',
          paddingBottom: '3rem',

        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            marginBottom: '50px',
            fontWeight: 700,
            letterSpacing: '2px',
          }}
        >
          <span className={css['text-yellow']}>Submit</span> Application
        </Typography>
        <div className={css['container-signup']}>
          {!methodClicked && <SignUpMethod setMethodClicked={setMethodClicked} setProfilePic={setProfilePic} setEmail={setEmail} setName={setName} setFormValues={setFormValues} />}
        </div>

        <div className={css['container']}>
          {methodClicked && (<>
            <Box
              sx={{
                backgroundColor: '#0a0a1b',
                padding: {
                  lg: '20px 80px 20px 80px'
                },
                borderRadius: '10px',
                border: '1px solid #1F1F53',
              }}
            >
              <Grid container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
                marginBottom={7}
                marginTop={2}>
                <Avatar sx={{ width: 150, height: 150, marginBottom: '15px', bgcolor: "grey" }} src={profilePicPreview}>
                </Avatar>
                <Box
                  component="label"
                  sx={{
                    backgroundColor: '#f6c927',
                    borderRadius: '5px',
                    width: 'fit-content',
                    padding: '10px',
                    color: 'black',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0px 0px 10px 0px #f6c927bd',
                  }}
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleUploadClick}
                  />
                </Box>
              </Grid>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' },
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
              >

                {labels.map(({ type, label, key, options, validator }, index) => {
                  const FieldComponent = FIELDS_MAP[type];
                  return label === 'Experience Details' && formValues['experience'] !== 'כן' ? null : (
                    <EntranceAnimation key={index} animationDelay={label === 'Experience Details' ? 0 : index * 0.2}>
                      <Box
                        sx={{
                          marginBottom: {
                            xs: '0.75rem',
                          },
                        }}
                      >
                        <FieldComponent
                          type="text"
                          sx={{
                            width: {
                              xs: '90%',
                              lg: '100%',
                            },
                            alignSelf: 'center',
                          }}
                          options={options}
                          label={label}
                          email={email}
                          name={name}
                          onChange={(event) => {
                            setFormValues((prev) => {
                              return { ...prev, [key]: event.target.value };
                            });
                            inputHandler(validator, key, event.target.value);
                          }}
                          error={validationErrors[key]}
                        />
                      </Box>
                      <Typography
                        sx={{
                          textAlign: 'start',
                          color: '#f44336',
                        }}
                      >
                        {validationErrors[key] ? errorMessages[key] : ''}
                      </Typography>
                    </EntranceAnimation>
                  );
                })}

              </Box>
              <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} md={6}>
                  <TransitionsModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    title={'נרשמת בהצלחה!'}
                    closeOnOverlay={false}
                    btnText="מעבר לדף הבית"
                    btnOnClick={goHome}
                  >
                    <Typography
                      variant="p"
                      sx={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        marginTop: '2rem',
                      }}
                    >
                      מוזמנים להצטרף לקבוצת הוואטספ שלנו
                    </Typography>
                    <a
                      style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: 'bold',
                        marginRight: '1rem',
                      }}
                      href="https://chat.whatsapp.com/BSs6DSDRUiW8UHe4ZfrABt"
                    >
                      לחץ כאן
                    </a>
                  </TransitionsModal>

                  <TransitionsModal
                    openModal={openRulesModal}
                    setOpenModal={setOpenRulesModal}
                    title={'תקנון'}
                    closeOnOverlay={true}
                    btnText="סגור"
                    btnOnClick={() => setOpenRulesModal(false)}
                  >
                    <ul>
                      {allRules.map((rule) => {
                        return <li key={rule}>{rule}</li>;
                      })}
                    </ul>
                    <Container
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                      }}
                    >

                    </Container>
                  </TransitionsModal>

                  <Loader loading={loader} />
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { sm: '1fr', md: '1fr' },
                      gap: '1rem',
                    }}

                  >
                    <Typography sx={{ direction: 'rtl', fontWeight: 'bold', fontSize: '20px' }}>
                      מועד יום מיון (ניתן לבחור את שני התאריכים):
                    </Typography>
                    <Container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Checkbox
                        defaultChecked={false}
                        onClick={() => {
                          setCheckBoxes({ ...checkBoxes, first: !checkBoxes.first });
                        }}
                        sx={{ color: 'white' }}
                      />
                      <Typography >
                        10.11.2024
                      </Typography>
                    </Container>
                    <Container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '30px',
                      }}
                    >
                      <Checkbox
                        defaultChecked={false}
                        onClick={() => { setCheckBoxes({ ...checkBoxes, second: !checkBoxes.second }); }}
                        sx={{ color: 'white' }}
                      />
                      <Typography >
                        14.11.2024
                      </Typography>
                    </Container>
                    <Container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '30px',
                      }}
                    >
                      <Checkbox
                        defaultChecked={rules ? true : false}
                        onClick={() => {
                          setRules((prev) => !prev);
                          setOpenRulesModal(false);
                        }}
                        sx={{ color: 'white' }}
                      />
                      <Typography >
                        אני מאשר\ת את תנאי{' '}
                        <span className={css['terms']} onClick={() => setOpenRulesModal((prev) => !prev)}>
                          התקנון
                        </span>
                      </Typography>
                    </Container>
                  </Box>

                  {rules && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                      <ArrowButton disabled={!rules} onClick={onSignupHandler}>
                        Submit
                      </ArrowButton>
                    </div>
                  )
                  }
                </Grid>
              </Grid>
            </Box>
          </>)}
        </div>
      </Container>
    </EntranceAnimation >
  );
};

export default SignUpPage;
