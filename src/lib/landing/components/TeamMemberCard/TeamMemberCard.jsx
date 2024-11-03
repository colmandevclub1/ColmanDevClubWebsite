import * as React from 'react';

import { LinkedIn as LinkedInIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import { TeamMemberCardContainer } from './TeamMemberCard.style';

const TeamMemberCard = ({ profileImage, name, about, linkedin }) => {
  const [isImgLoaded, setIsImgLoaded] = React.useState(false);

  return (
    <TeamMemberCardContainer>
      <Stack
        display={isImgLoaded ? 'flex' : 'none'}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        padding={2}
        height={{ xs: '350px', lg: '350px', xl: '400px' }}
      >
        <Avatar
          src={profileImage}
          alt={name}
          onLoad={() => setIsImgLoaded(true)}
          sx={{
            width: { xs: '150px', lg: '150px' },
            height: { xs: '150px', lg: '150px' },
            borderWidth: { xs: '3px', lg: '5px' },
          }}
        />
        <Typography variant="h5" fontWeight={900} color="primary">
          {name}
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {about}
        </Typography>
        <Link to={linkedin} target="_blank">
          <IconButton>
            <LinkedInIcon fontSize="large" color="primary" />
          </IconButton>
        </Link>
      </Stack>
    </TeamMemberCardContainer>
  );
};

export default TeamMemberCard;
