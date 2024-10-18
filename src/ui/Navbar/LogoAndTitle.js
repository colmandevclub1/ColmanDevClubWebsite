import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const LogoAndTitle = () => {
  return (
    <Stack gap={1} direction={'row'} alignItems={'center'}>
      <Box
        component="img"
        sx={{
          height: { xs: 20, md: 25 },
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src="LogoBig-WhiteNoTextSmall.png"
      />
      <Typography
        variant="h6"
        component="a"
        href="/"
        sx={{
          display: 'flex',
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Colman
        <Typography color="primary" variant="h6" fontWeight={700}>
          Dev
        </Typography>
        Club
      </Typography>
    </Stack>
  );
};

export default LogoAndTitle;
