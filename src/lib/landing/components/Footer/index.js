import * as React from 'react';

import { Container, AppBar, Box, Toolbar, Typography, Grid, ImageListItem } from '@mui/material';
import { GitHub, LinkedIn, Instagram } from '@mui/icons-material';

import css from './style.module.css';
import Logo from '../../../../assets/‏‏logos.png';
import LogoAguda from '../../../../assets/logoAcademicStudent.svg';

const iconStyle = { fontSize: { xs: '1.5rem', lg: '1.75rem' } };
const iconsLink = [
  {
    href: 'https://github.com/ColmanDevClub',
    icon: <GitHub sx={iconStyle} />,
  },
  {
    href: 'https://www.linkedin.com/company/colman-devclub/',
    icon: <LinkedIn sx={iconStyle} />,
  },
  {
    href: 'https://www.instagram.com/colmandevclub/',
    icon: <Instagram sx={iconStyle} />,
  },
];

export default function DenseAppBar() {
  return (
    <AppBar
      position="static"
      color="secondary"
      sx={{
        paddingY: { xs: 2, md: 4, lg: 6 },
        borderTop: '1px solid #1F1F53',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          variant="dense"
          sx={{
            display: { xs: 'flex' },
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageListItem
              sx={{
                width: { xs: '50%', md: '15%', lg: '15%' },
                display: { xs: 'flex', md: 'flex' },
                justifyContent: 'center',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
              }}
            >
              <img src={Logo} className={css['photo']} alt="programmers" loading="lazy" style={{ width: '250px' }} ></img>
              <img src={LogoAguda} className={css['photo']} alt="programmers" loading="lazy" style={{ width: '150px' }} />
            </ImageListItem>
          </Grid>
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'flex', md: 'flex' },
              fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.75rem' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Colman<span className={css['text-yellow']}>Dev</span>Club
          </Typography> */}
          <Box
            component="img"
            sx={{
              height: 150,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              marginBottom: 1
            }}
            alt="The house from the offer."
            src="LogoBig-WhiteTrimed.png"
          />
          <Box sx={{ display: 'flex' }} gap="0.75rem">
            {iconsLink.map((icon) => {
              return (
                <a key={icon.href} href={icon.href} target="_blank" rel="noreferrer" className={css['icon']}>
                  {icon.icon}
                </a>
              );
            })}
          </Box>
          <Typography
            component="p"
            sx={{
              marginX: '0',
              marginY: '0',
              color: '#999999',
              fontSize: { xs: '0.85rem', md: '1rem' },
              display: 'flex',
              gap: '0.5rem',
              textAlign: 'center',
              width: 'fit-content',
            }}
          >
            <Typography component="span" sx={{ width: 'fit-content' }}>
              © All Rights Reserved To Colman
              <Typography component="span" className={css['text-yellow']} style={{ filter: 'brightness(0.75)' }}>
                Dev
              </Typography>
              Club
            </Typography>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
