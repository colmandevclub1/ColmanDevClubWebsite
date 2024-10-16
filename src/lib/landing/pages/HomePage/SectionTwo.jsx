import { Box, Grid, ImageListItem, Typography, styled } from '@mui/material';
import React from 'react';
import Photo from '../../../../assets/f77ca20b70b8ec4625f929fb85e567f4.png';

export const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 10),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 4),
  },

  [theme.breakpoints.up('xl')]: {
    padding: theme.spacing(8, 20),
  },
}));

const SectionTwo = () => {
  return (
    <SectionContainer
      sx={{ background: 'linear-gradient(306deg, rgba(246, 201, 39, 1), rgb(180, 142, 5))', direction: 'rtl' }}
    >
      <Typography variant="h3" textAlign={'center'} sx={{ direction: 'rtl', marginBottom: '3rem' }} fontWeight={900}>
        אז מה צפוי לנו?
      </Typography>
      <Grid container alignItems={'center'}>
        <Grid item xs={12} md={4}>
          <ImageListItem>
            <img src={Photo} alt="" />
          </ImageListItem>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" color="secondary" fontWeight={900}>
                1.
              </Typography>
              <Typography variant="h5" color={'secondary'} fontWeight={900}>
                במהלך המפגשים נשתמש בכלים שנלמדו בתואר וניצור פרויקטים אמיתיים. <br />
                נעבוד בצוותים המדמים צוותי פיתוח בתעשייה ונרכוש ידע רלוונטי להתפתחות מקצועית בתחום ה-FullStack.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" color="secondary" fontWeight={900}>
                2.
              </Typography>
              <Typography variant="h5" color={'secondary'} fontWeight={900}>
                כל התהליך יהיה בצמוד למנטורים המעולים שלנו שיעזרו בכל שלב בדרך. <br />
                נפתח מיומנויות חשובות ונתנסה בטכנולוגיות החדשות ביותר בשוק שיעזרו לכם להפוך מסטודנטים למתכנתים.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" color="secondary" fontWeight={900}>
                3.
              </Typography>
              <Typography variant="h5" color={'secondary'} fontWeight={900}>
                המטרה היא שתצברו ניסיון בתעשיית ההייטק, תצאו עם תוצרים מרשימים לתיק העבודות ותהיו חלק מקהילת מפתחים.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h1" color="secondary" fontWeight={900}>
                4.
              </Typography>
              <Typography variant="h5" color={'secondary'} fontWeight={900}>
                בנוסף למפגשים השבועיים, המועדון מקיים האקתונים, הדרכות בנושאים שונים, סיורים, מפגשי גיבוש ועוד. <br />
                תתכוננו לחוויית למידה שתזניק לכם את הקריירה!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SectionContainer>
  );
};

export default SectionTwo;
