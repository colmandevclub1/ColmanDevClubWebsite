import * as React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  IconButton,
  Chip,
  Stack,
  Box,
} from '@mui/material';

import { GitHub as GitHubIcon, Language as LanguageIcon } from '@mui/icons-material/';

const ProjectCard = ({ image_url, title, description, github_url, website_url, language }) => {
  return (
    <Card sx={{ direction: 'rtl' }}>
      <CardMedia
        sx={{ borderRadius: '8px', height: 225, objectFit: 'cover' }}
        image={image_url}
        title={`${title} image`}
      />
      <CardContent>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography gutterBottom variant="h4" component="div" color={'primary'} fontWeight={900}>
            {title}
          </Typography>
          <Box>
            <Tooltip title="Check out the project on GitHub">
              {github_url && (
                <IconButton href={github_url} target="_blank" rel="noreferrer">
                  <GitHubIcon sx={{ fontSize: '1.75rem' }} color="primary" />
                </IconButton>
              )}
            </Tooltip>
            <Tooltip title="Check out the project on web">
              {website_url && (
                <IconButton href={website_url} target="_blank" rel="noreferrer">
                  <LanguageIcon sx={{ fontSize: '1.75rem' }} color="primary" />
                </IconButton>
              )}
            </Tooltip>
          </Box>
        </Stack>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ gap: '5px' }}>
        {language && language.map((lang) => <Chip label={lang} />)}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
