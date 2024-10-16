import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionContainer } from './SectionTwo';
import { ArrowButton } from '../../../../ui';

const SectionThree = () => {
  const navigate = useNavigate();
  return (
    <SectionContainer
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#040413',
        borderTop: '1px solid #1F1F53',
        borderBottom: '1px solid #1F1F53',
      }}
    >
      <Typography variant="h3" sx={{ direction: 'rtl', marginBottom: '3rem' }} fontWeight={900}>
        איך מתקבלים?
      </Typography>
      <Typography variant="h5" sx={{ direction: 'rtl', marginBottom: '2rem' }} textAlign={'center'}>
        המועדון הוא מועדון אקסקלוסיבי - יש לנו מספר מוגבל של מקומות.
        <br />
        כדי להצטרף למועדון צריך לעבור מיונים מקיפים.
        <br />
        הדבר שהכי חשוב לנו הוא לסייע לכם להתקדם בתחום, להתנסות בעבודה עצמאית,
        <br />
        לצאת לשוק העבודה עם תיק עבודות מרשים, וכמובן, לצאת מתכנתי על, ולא פחות מזה!
        <br />
        אתם.ן בעלי מוטיבציה גבוהה, יכולת למידה עצמית והתמדה? מוזמנים להירשם!
      </Typography>
      <ArrowButton variant="contained" onClick={() => navigate('/Signup')}>
        Getting Started
      </ArrowButton>
    </SectionContainer>
  );
};

export default SectionThree;
