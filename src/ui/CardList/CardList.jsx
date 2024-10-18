import React from 'react';

import { Grid } from '@mui/material';

import ProjectCard from '../../lib/landing/components/ProjectCard/ProjectCard';
import EntranceAnimation from '../../animation/EntranceAnimation';

const CardList = ({ cards, CardComponent = ProjectCard, AnimationComponent = EntranceAnimation }) => {
  return (
    <Grid container gap={3} justifyContent={"center"}>
      {cards.map((card, index) => {
        return (
          <Grid key={card + index} xs={10} sm={5} md={3} lg={3} >
            <AnimationComponent animationDelay={index * 0.2}>
              <CardComponent {...card} />
            </AnimationComponent>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CardList;
