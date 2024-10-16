import * as React from 'react';
import { Box, Checkbox, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import FormInputField from 'src/ui/FormInputField';
import FormSelectField from 'src/ui/FormSelectField';
import { allRules, errorMessages, labels } from 'src/data';
import { addUser, fetchData } from 'src/config/firebase-utils';
import { EntranceAnimation } from 'src/animation';
import { ArrowButton, TransitionsModal } from 'src/ui';
import styles from './style.module.css';

const FIELDS_MAP = {
  TextField: FormInputField,
  Select: FormSelectField,
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});
  const [validationErrors, setValidationErrors] = React.useState({});
  const [openRulesModal, setOpenRulesModal] = React.useState(false);
  const [rules, setRules] = React.useState(false);

  React.useEffect(() => {
    labels.forEach((label) =>
      setFormValues((prev) => {
        return { ...prev, [label.key]: '' };
      })
    );
  }, []);

  const onSignupHandler = async () => {
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
    setOpenModal(true); //TODO --> If we want to test it again, move to line 151. after testing return to line 163.
    const newUser = { ...formValues, date: new Date().toLocaleDateString() };
    addUser({ newUser });
    // const { email, password } = formValues;
    try {
      // await createUserWithEmailAndPassword(auth, email, password);
      // await signInWithEmailAndPassword(
      //   auth,
      //   formValues.email,
      //   formValues.password
      // )
      //   .then((userCredential) => {
      //     localStorage.setItem(
      //       "userToken",
      //       JSON.stringify(userCredential._tokenResponse.idToken)
      //     );
      //   }).then(()=>{
      //     sendDataToAgudaForm(
      //       formValues.email,
      //       formValues.fullName,
      //       formValues.phoneNumber,
      //       "הפקולטה למדעי המחשב",
      //       "מועדון המפתחים",
      //       "שנה " + formValues.schoolYear + "'",
      //       "טובה מאוד",
      //       "",
      //       false,
      //       false
      //     )
      //   })
      //   .catch((error) => {});
      // await sendDataToAgudaForm(
      //           formValues.email,
      //           formValues.fullName,
      //           formValues.phoneNumber,
      //           "הפקולטה למדעי המחשב",
      //           "מועדון המפתחים",
      //           "שנה " + formValues.schoolYear + "'",
      //           "טובה מאוד",
      //           "",
      //           false,
      //           false
      //         )
    } catch (error) {
      console.log(error);
    }
  };

  const inputHandler = (validator, key, value) => {
    const isValid = validator(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [key]: !isValid,
    }));
  };

  return (
    <EntranceAnimation>
      <Container
        maxWidth="md"
        sx={{
          paddingTop: '3rem',
          paddingBottom: '3rem',
          px: {
            xs: '2rem',
            md: '5rem',
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: 700,
            letterSpacing: '4px',
          }}
        >
          <span className={styles['text-yellow']}>Sign</span>up
        </Typography>
        <div className={styles['container']}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' },
              gap: { sm: '1rem', md: '2rem' },
              marginBottom: '2rem',
            }}
          >
            {labels.map(({ type, label, key, options, validator }, index) => {
              const FieldComponent = FIELDS_MAP[type];
              return label === 'Experience Details' && formValues['experience'] !== 'כן' ? null : (
                <EntranceAnimation animationDelay={label === 'Experience Details' ? 0 : index * 0.2}>
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
                        width: '100%',
                      }}
                      options={options}
                      label={label}
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
            <Grid xs={12} md={6}>
              <TransitionsModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={'נרשמת בהצלחה'}
                closeOnOverlay={false}
                btnText="מעבר לדף הבית"
                btnOnClick={() => navigate('/')}
              >
                <Typography
                  variant="p"
                  sx={{
                    textAlign: 'center',
                    marginBottom: '2rem',
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
                    return <li>{rule}</li>;
                  })}
                </ul>
                <Container
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                ></Container>
              </TransitionsModal>
              <Container
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                <Typography>
                  אני מאשר את תנאי{' '}
                  <span className={styles['terms']} onClick={() => setOpenRulesModal((prev) => !prev)}>
                    התקנון
                  </span>
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ArrowButton disabled={!rules} onClick={onSignupHandler}>
            Signup
          </ArrowButton>
        </div>
      </Container>
    </EntranceAnimation>
  );
};

export default SignUpPage;
