import { Grid, ImageListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Photo from 'src/assets/ef1b7b898f8d650f0ecdcb6ad5b9baea.png';
import EntranceAnimation from '../../../../animation/EntranceAnimation';
import css from './style.module.css';
import LangCard from '../../components/LangCard/LangCard';
import { ArrowButton } from 'src/ui';
import { typesCards } from '../../components/LangCard/data';

const SectionOne = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      gridTemplateColumns={'5fr 1fr'}
      py={{ xs: 1, md: 4 }}
      px={{ xs: 2, lg: 10 }}
      spacing={{ xs: 0, lg: 2 }}
      alignItems={'center'}
    >
      <Grid item xs={12} md={6} lg={6}>
        <ImageListItem
          sx={{
            width: { md: '80%', lg: '95%' },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img src={Photo} className={css['photo']} alt="programmers" loading="lazy"></img>
        </ImageListItem>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Stack paddingLeft={{ xs: 0, lg: 5 }} alignItems={{ xs: 'center', lg: 'flex-end' }} paddingBottom={{ xs: 10 }}>
          <Typography
            fontSize={{ xs: '3rem', md: '5rem', lg: '6rem' }}
            fontWeight={900}
            textAlign={{ xs: 'center', md: 'end' }}
          >
            מועדון <span className={css['text-yellow']}>מפתח</span>ים/ות
          </Typography>
          <Typography
            textAlign={{ xs: 'center', md: 'start' }}
            fontSize={{ xs: '1rem', md: '1.1rem', lg: '1.2rem' }}
            sx={{ direction: 'rtl' }}
          >
            המועדון הפועל במסגרת אגודת הסטודנטים של המכללה למינהל, הוקם במטרה לסייע לסטודנטים וסטודנטיות לרכוש ידע
            ולהתפתח בתחום ה- <b> FULLSTACK </b>. <br />
            ללמוד לפתח זה דבר אחד - לממש את הלמידה זה דבר אחר לגמרי. <br />
            השאיפה שלנו היא ללמוד לפתח טוב יותר, להתנסות ולהכיר את הטכנולוגיות הכי חדישות ומתקדמות בשוק. באמצעות
            המנטורים והכלים שתקבלו, תממשו את הידע שלכם ותיקחו אותו צעד אחד קדימה!
            <br />
            <br />
            <span style={{ display: 'block' }}>
              רוצה לשמוע על שאר המועדונים שלנו? &nbsp;
              <a
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                }}
                href="https://colmanaguda.activetrail.biz/colmanclubs2024"
              >
                לחץ כאן
              </a>
            </span>
          </Typography>
          <ArrowButton onClick={() => navigate('/Signup')}>להרשמה לחצו כאן</ArrowButton>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container gap={{ xs: 2, md: 4 }} justifyContent={'center'}>
          {typesCards.map((card, index) => {
            return (
              <Grid item xs={12} md={3} lg={2}>
                <EntranceAnimation animationDelay={index * 0.2}>
                  <LangCard {...card} />
                </EntranceAnimation>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SectionOne;
