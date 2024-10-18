import { Typography } from '@mui/material';
import React from 'react';
import Carousel from '../../components/Carousel';
import Loader from '../../../../ui/Loader';
import { SectionContainer } from './SectionTwo';
import css from './style.module.css';
import { ProjectCard } from '../../components';
import { useFirestoreFetch } from 'src/hooks/useFirestoreFetch';

const SectionFour = () => {
  const { data: cards, isLoading } = useFirestoreFetch('projects');

  return (
    <SectionContainer
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2" fontWeight={900} textAlign={'center'} marginBottom={5}>
        ה<span className={css['text-yellow']}>פרוייקט</span>ים שלנו
      </Typography>
      <Loader isLoading={isLoading}>
        {cards && (
          <Carousel
            settings={{
              slidesToScroll: 1,
              slidesToShow: 3,
              infinite: true,
              responsive: [
                {
                  breakpoint: 800,
                  settings: { slidesToScroll: 1, slidesToShow: 2 },
                },
                {
                  breakpoint: 500,
                  settings: { slidesToScroll: 1, slidesToShow: 1 },
                },
              ],
            }}
          >
            {cards.map((card) => {
              return (
                <div key={card.title} className={css['slide']}>
                  <ProjectCard {...card} />
                </div>
              );
            })}
          </Carousel>
        )}
      </Loader>
    </SectionContainer>
  );
};

export default SectionFour;
